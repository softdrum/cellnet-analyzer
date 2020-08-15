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
    return this.modem.open(this.port, this.options)
      .then(result => {
        console.log(result);
        this.setModemConnectionStatus(true)
        return this.getModemConnectionStatus()
      })
      .catch(error => {
        console.log(error);
        this.setModemConnectionStatus(false)
        return this.getModemConnectionStatus()
      })
  }
  executeAtCommand (command) {
    return new Promise ((resolve, reject) => {
      if (!this.getModemConnectionStatus()) reject('modem is not connected')
      this.modem.executeCommand(command)
        .then( result => {
          resolve(result)
        })
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
