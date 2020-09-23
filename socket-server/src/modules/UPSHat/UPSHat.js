const i2c = require('i2c-bus');


class UPSHat {
  constructor (address) {
      this.address = address
  }
  swap16(val) {
      return ((val & 0xFF) << 8)
              | ((val >> 8) & 0xFF);
  }
  getValueFromRegister (register) {
    return new Promise ((resolve, reject) => {
      const i2c1 = i2c.open(1, err => {
        if (err) reject(err);
        else {
          i2c1.readWord(this.address, register, (err, rawData) => {
            if (err) reject(err);
            else {
              i2c1.close(err => {
                if (err) reject(err);
                else resolve(this.swap16(rawData))
              });
            }
          });
        }
      })  
    })
  }
  async getCapacity () {
    try {
      let value = await this.getValueFromRegister(4);
      let capacity =  Math.round(value / 256);
      return capacity
    } catch (error) {
      console.log(error);
      return 0
    }
  }
  async getVoltage () {
    try {
      let value = await this.getValueFromRegister(2);
      let voltage = (value * 78.125 / 1000000).toFixed(1);
      return voltage
    } catch (error) {
      console.log(error);
      return 0
    }
  }
  async getBatteryInfo () {
    let voltage = await this.getVoltage();
    let capacity = await this.getCapacity();
    return { capacity, voltage }
  }
}

module.exports = UPSHat
