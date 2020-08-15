const Modem = require('./modem')
const MockModem = require('./mockModem')


module.exports = (port, baudRate, debug, test=true) => {
  if (test) return new MockModem(port, baudRate, debug)
  return new Modem(port, baudRate, debug)
}
