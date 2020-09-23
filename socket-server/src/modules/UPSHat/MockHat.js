const i2c = require('i2c-bus');


class MockHat {
  constructor (address) {
      this.address = address,
      this.capacity = 0,
      this.step = 5
  }
  async getCapacity () {
    if (this.capacity === 100) {
      this.step = -5
    } else if (this.capacity === 0) {
      this.step = 5
    }
    return this.capacity += this.step
  }
  async getVoltage () {
    return Math.round(Math.random()*5)
  }
  async getBatteryInfo () {
    let voltage = await this.getVoltage();
    let capacity = await this.getCapacity();
    return { capacity, voltage }
  }
}

module.exports = MockHat
