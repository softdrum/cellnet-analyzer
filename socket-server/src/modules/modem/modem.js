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
    this._port = port;
    this.options = modemOptions.generate(baudRate, logger);
    this._modem = serialPortGSM.Modem()
    this._busy = false
  }
  async initModem() {
    try {
      let result = await this._modem.open(this._port, this._options);
      return result.data.status === 'Online'
    } catch (error) {
      return false
    }
  }
  stopModem() {
    console.log('Stopping modem');
    this.modem.close();
  }
  executeAtCommand (command) {
    return this._modem.executeCommand(command)
  } 
  setBusyMode (value) {
    this._busy = value
  }
  getBusyMode () {
    return this._busy
  }
}

module.exports = Modem
