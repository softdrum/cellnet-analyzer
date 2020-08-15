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
    this.connected = true
    return true
  }
  executeAtCommand (command) {
    return new Promise ((resolve, reject) => {
      if (true) resolve(Math.abs(Math.round(Math.random()*100)))
      else reject('Modem error'+command)
    }) 
  }
  getSignalQuality () {
    return this.executeAtCommand('AT+CSQ').then(result => {
      return {
        s_lvl: -result,
        ber: -result/10
      }
    })
  }
  getGPSCoordinates () {
    return this.executeAtCommand('AT+CGPSINFO')
  }
  getAvailableOperators () {
    return this.executeAtCommand('AT+COPS=?')
  }
  getBasestationInfo () {
    return this.executeAtCommand('AT+COPS=?').then(result => {
      return {
        status: 'online',
        rsrq: -80,
        lac: 322,
        snr: 35,
        mode: 'LTE',
        mcc: '250',
        mnc: '02',
      }
    })
  }
  setPrefferedSystemMode(mode) {
    return this.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
  }
  changeNetMode (mode) {
    return this.executeAtCommand(`AT+CNMP=${modemHelpers.getSystemModeCode(mode)}`)
  }
}

module.exports = Modem
