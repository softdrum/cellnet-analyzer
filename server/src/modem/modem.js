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
    this.connected = false
    this.isBusy = false
    this.logMode = false
  }
  setModemConnectionStatus (value) {
    this.connected = value
  }
  setBusyMode (value) {
    this.isBusy = value
  }
  setLogMode (value) {
    console.log('setting log mode');
    this.logMode = value
  }
  getModemConnectionStatus () {
    return this.connected
  }
  getBusyMode () {
    return this.isBusy
  }
  getLogMode () {
    return this.logMode
  }
  
  initModem() {
    this.modem.open(this.port, this.options)
      .then(result => {
        console.log(result);
        console.log('Modem connection is opened');
        this.setModemConnectionStatus(true)
      })
      .catch(error => {
        console.log(error);
        this.setModemConnectionStatus(false)
      })
  }
  executeAtCommand (command) {
    return new Promise ((resolve, reject) => {
      if (!this.getModemConnectionStatus()) reject('modem is not connected')
      else if (this.getBusyMode()) reject('modem is busy')
      this.modem.executeCommand(command)
        .then( result => {
          resolve(result)
        })
      
    }) 
  }
  getSignalQuality () {
    return this.executeAtCommand('AT+CSQ')
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
  getGPSCoordinates () {
    return this.executeAtCommand('AT+CGPSINFO')
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
    return this.executeAtCommand('AT+COPS=?')
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
    return this.executeAtCommand('AT+CPSI?')
      .then(response => {
        if (response.status === 'ERROR') throw 'Can not get BS Info'
        if (response.data.result.trim() === 'NO SERVICE,Online') throw 'No service'
        const info = modemHelpers.extractBasestationInfo(response.data.result)
        if (!info) throw `Unknown data: ${response}`
        return info.groups
      })
  }
  setPrefferedSystemMode(mode) {
    return this.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
  }
  changeNetMode (mode) {
    return this.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
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
