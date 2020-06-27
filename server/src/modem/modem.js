const serialPortGSM = require('serialport-gsm')
const modemOptions = require('./modemOptions')
const modemRegExp = require('./modemRegexp')
const modemHelpers = require('./modemHelpers')

function sleep (ms) {return new Promise(resolve => {setTimeout(() => resolve(), ms)})}

class Modem{
  constructor(port, baudRate, logger=null) {
    this.port = port
    this.options = modemOptions.generate(baudRate, logger)
    this.modem = serialPortGSM.Modem()
    this.isBusy = false
    this.logMode = false
  }
  setLogMode (value) {
    console.log('setting log mode');
    this.logMode = value
  }
  initModem() {
    this.modem.open(this.port, this.options)
      .then(result => {
        console.log(result);
        console.log('Modem connection is opened');
      })
      .catch(error => {
        console.log(error);
      })
  }
  getSignalQuality () {
    return this.modem.executeCommand('AT+CSQ')
    .then( (result) => {
      if (result.status === 'ERROR') throw 'Error: Can not get signal quality'
      let data = result.data.result.match(modemRegExp.signalQuality)
      if (!data) throw 'Error: Can not get signal quality'
      return {
        s_lvl: modemHelpers.calculateSignalLevel(data.groups.s_lvl),
        ber: modemHelpers.calculateBitErrorRate(data.groups.ber)
      }
    })
  }
  getAvailableOperators () {
    return this.modem.executeCommand('AT+COPS=?')
    .then(response => {
      if (response.status === 'ERROR') throw 'Error: Can not get available operators'
      let data = response.data.result.matchAll(modemRegExp.availableOperators)
      if (!data) throw 'Error: Can not get available operators'
      const available_operators = [...data].map(item => { return item.groups })
      const unique_operators = modemHelpers.filterUniqueOperators(available_operators)
      return {
        topic: 'available_operators',
        data:  unique_operators
      }
    })
  }
  getBasestationInfo () {
    return this.modem.executeCommand('AT+CPSI?')
      .then(response => {
        if (response.status === 'ERROR') throw 'Can not get BS Info'
        if (response.data.result.trim() === 'NO SERVICE,Online') throw 'No service'
        const info = modemHelpers.extractBasestationInfo(response.data.result)
        if (!info) throw `Unknown data: ${response}`
        return info.groups
      })
  }
  setPrefferedSystemMode(mode) {
    return this.modem.executeCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
  }
  changeNetMode (mode) {
    return this.modem.executeCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
    .then (response => {
      if (response.data.result === 'ERROR')  throw 'Unable to set preffered system mode'
      return sleep(5000).then(() => {
        return this.getBasestationInfo()
      })
    })
    .then (response => {
      this.modemBusy = false
      if (response.mode === mode || mode === 'auto') return 'SUCCESS'
      else throw 'Preffered mode was changed but modem is not connected to suitable base station'
    })
    .catch (error => {
      this.modemBusy = false
      throw error
    })
  }
}

module.exports = Modem
