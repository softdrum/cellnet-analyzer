const Modem = require('./modem')
module.exports = (port, baudRate, debug) => {
  return new Modem(port, baudRate, debug)
}
