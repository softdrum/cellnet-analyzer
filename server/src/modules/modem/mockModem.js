const serialPortGSM = require('serialport-gsm')
const modemOptions = require('./modemOptions')


class Modem{
  constructor(port, baudRate, logger=null) {
    this.port = port
    this.options = modemOptions.generate(baudRate, logger)
    this.modem = serialPortGSM.Modem()
    this.connected = false
    this.isBusy = false
  }
  initModem() {
    this.connected = true
    return true
  }
  executeAtCommand (command) {
    return new Promise ((resolve, reject) => {
      if (!this.getModemConnectionStatus()) reject('modem is not connected')
      switch (command) {
        case 'AT+CSQ': resolve({
          status: 'SUCCESS',
          data: {
            result: '110,2'
          }
        })
        case 'AT+CSQ': resolve({
          status: 'SUCCESS',
          data: {
            result: '110,2'
          }
        })
      }
    })
  } 
  setModemConnectionStatus (value) {
    this.connected = value
  }
  setBusyMode (value) {
    this.isBusy = value
  }
  getModemConnectionStatus () {
    return this.connected
  }
  getBusyMode () {
    return this.isBusy
  }
}

module.exports = Modem
