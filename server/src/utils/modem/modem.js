const serialPortGSM = require('serialport-gsm')
const modemOptions = require('./modem.options')
const modemRegExp = require('./modem.regexp')
const modemHelpers = require('./modem.helpers')

function sleep (ms) {return new Promise(resolve => {setTimeout(() => resolve(), ms)})}

class Modem{
  constructor(port, baudRate, logger=null) {
    this.port = port
    this.options = modemOptions.generate(baudRate, logger)
    this.modem = serialPortGSM.Modem()
    this.settingsMode = false
  }
  openModemConnection() {
    this.modem.open(this.port, this.options)
    // this.modem.on('open', data => {
    //   console.log(data);
    //   this.modem.initializeModem()
    // })
  }
  getSignalQuality () {
    return this.modem.executeCommand('AT+CSQ')
    .then( (result) => {
      if (result.status === 'ERROR') throw 'Error: Can not get signal quality'
      let data = result.data.result.match(modemRegExp.signalQuality)
      if (!data) throw 'Error: Can not get signal quality'
      return {
        topic: 'signal_quality',
        data: {
          s_lvl: modemHelpers.calculateSignalLevel(data.groups.s_lvl),
          ber: modemHelpers.calculateBitErrorRate(data.groups.ber)
        }
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
        if (response.status === 'ERROR') throw 'Error: Can not get BS Info'
        const info = modemHelpers.extractBasestationInfo(response.data.result)
        if (!info) throw `Error: Unknown data: ${response}`
        return info.groups
      })
  }
  setPrefferedSystemMode(mode) {
    return this.modem.executeCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
  }
  changeMode (mode) {
    return this.modem.executeCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
    .then (response => {
      if (response.data.result === 'ERROR')  throw 'Unable to set preffered system mode'
      return sleep(5000).then(() => {
        return this.getBasestationInfo()
      })
      
    })
    .then (response => {
      if (response.mode === mode || mode === 'auto') return 'SUCCESS'
      else throw 'Preffered mode was changed but modem is not connected to suitable base station'
    })
  }
}

module.exports = Modem
