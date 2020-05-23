const os = require('os-utils')
const fs = require('fs')
const checkDiskSpace = require('check-disk-space')

module.exports = {
  cpuUsage() {
    return new Promise((resolve, reject) => {
      try {
        os.cpuUsage(value => {
          resolve(Math.round(value*100))
        })
      } catch (error) {
        reject(0)
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
        resolve(os.freememPercentage()*100)
        // resolve(os.freemem())
      } catch (error) {
        reject(error)
      }
    })
  },
  checkDiskSpace() {
    return checkDiskSpace('/')
  }
}
