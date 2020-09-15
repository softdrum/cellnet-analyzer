const Modem = require('./modem')
const mockModem = require('./mockModem')


module.exports = (port, baudRate, mock) => {
  console.log(port, baudRate, mock);
  if (mock) return new mockModem(port, baudRate, false)
  return new Modem(port, baudRate, false)
}
