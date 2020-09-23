const UPSHat = require('./UPSHat')
const MockHat = require('./MockHat')


module.exports = (address, mock) => {
  if (mock) return new MockHat(address)
  return new UPSHat(address)
}
