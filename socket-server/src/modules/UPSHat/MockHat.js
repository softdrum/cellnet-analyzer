const i2c = require('i2c-bus');


class MockHat {
  constructor (address) {
      this.address = address
  }
  async getCapacity () {
    return Math.round(Math.random()*100)
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
