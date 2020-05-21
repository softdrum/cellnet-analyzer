const os = require('os-utils')
const fs = require('fs')
module.exports = {
  cpuUsage() {
    return new Promise((resolve, reject) => {
      try {
        os.cpuUsage(value => {
          resolve(value)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  cpuTemp() {
    return new Promise((resolve, reject) => {
      fs.readFile("/sys/class/thermal/thermal_zone0/temp", (error, data) => {
        if (error) {
          throw error
        }
        resolve(data/1000)
      })
    })
  },
  freeMemory() {
    return new Promise((resolve, reject) => {
      try {
        resolve(os.freemem())
      } catch (error) {
        reject(error)
      }
    })
  }
}
