const Modem = require('./modem')
const mockModem = require('./mockModem')


module.exports = (port, baudRate, debug, test=true) => {
  if (test) return new mockModem(port, baudRate, debug)
  return new Modem(port, baudRate, debug)
}
