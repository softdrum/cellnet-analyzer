const raspberry = require('./utils/raspberry')
const databaseService = require('./services/databaseService')
module.exports = {
  start (modem, io) {
    const modemService = require('./services/modemService')(modem)

    // async () => {
    //   let availableOperators = await modemService.getAvailableOperators()
    //   io.emit('available_operators', availableOperators)
    // }
    setInterval(async () => {
      if (!modem.getBusyMode()) {
        try {
          let signalQuality = await modemService.getSignalQuality()
          io.emit('signal_quality', signalQuality)
          // let basestationInfo = await modemService.getBasestationInfo()
          // io.emit('basestation', basestationInfo)
  
          // if (modem.logMode) {
          //   databaseService.addDataInDatabaseTable('signals', [{
          //     s_lvl: signalQuality.data.s_lvl,
          //     ber: signalQuality.data.ber,
          //     operator: 'none',
          //     generation: 'unknown'
          //   }])
          // }
        } catch (err) {
          console.log(err)
        }
      }
      let cpuInfo = await raspberry.cpuInfo()
      io.emit('cpu_info', cpuInfo)

      let diskSpace = await raspberry.checkDiskSpace()
      io.emit('disk_space', diskSpace)

      let freeMemory = await raspberry.freeMemory()
      io.emit('freemem_percentage', freeMemory)
    }, 1000)
  }
}
