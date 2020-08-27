const os = require('os-utils')
const fs = require('fs')
const checkDiskSpace = require('check-disk-space')

module.exports = {
  cpuUsage () {
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
  cpuInfo () {
    return new Promise((resolve, reject) => {
      let cpuUsage
      let cpuTemp
      this.cpuUsage().then(response => {
        cpuUsage = Math.round(response)
        return this.cpuTemp()
      })
      .then(response => {
        cpuTemp = Math.round(response)
        resolve ({
          cpuUsage,
          cpuTemp
        })
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  
  freeMemory() {
    return new Promise((resolve, reject) => {
      try {
        const data = {
          freemem: Math.round(os.freemem()),
          freememPercent: Math.round((1 - os.freememPercentage())*100)
        }
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  checkDiskSpace() {
    return checkDiskSpace('/')
  }
}
