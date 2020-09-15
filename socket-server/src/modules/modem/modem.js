const serialPortGSM = require('serialport-gsm')
const modemOptions = require('./modemOptions')


class Modem{
  /**
   * Modem class is an extension of serialPortGSM
   * library. It extends logic of at command execution and
   * simplifies work with connection initialization
   * @param {*} port 
   * @param {*} baudRate 
   * @param {*} logger 
   */
  constructor(port, baudRate, logger=null) {
    console.log('Creating real modem');
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
    if (!this.getModemConnectionStatus()) return 'modem is not connected'
    else {
      return this.modem.executeCommand(command)
    }
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
