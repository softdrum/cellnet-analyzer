const modemOptions = require('./modemOptions')


class Modem{
  /**
   * Simple mock that is made for testing
   * modem service without an actual simcom uart modem
   * @param {*} port 
   * @param {*} baudRate 
   * @param {*} logger 
   */
  constructor(port, baudRate, logger=null) {
    this.port = port
    this.options = modemOptions.generate(baudRate, logger)
    this.connected = false
    this.isBusy = false
  }
  initModem() {
    this.connected = true
    return true
  }
  async executeAtCommand (command) {
    if (!this.getModemConnectionStatus()) throw 'modem is not connected'
    if (command === 'AT+CSQ') {
      return {
        status: 'SUCCESS',
        data: {
          result: `${-Math.abs(Math.round(Math.random()*50))},${Math.abs(Math.round(Math.random())+3)}`
        }
      }
    }
    else if (command === 'AT+CNMP=13') return 'OK'
    else if (command ==='AT+CPSI?') return {result: 'success', data: {result: 'NO SERVICE,Online'}}
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
