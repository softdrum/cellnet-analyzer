const raspberry = require('./utils/raspberry')
module.exports = {
  start (modem, io) {
    const modemService = require('./services/modem.service')(modem)
    setInterval(async () => {
      if (!modem.getBusyMode()) {
        try {
          let signalQuality = await modemService.getSignalQuality()
          io.emit('signal_quality', signalQuality)
          let basestationInfo = await modemService.getBasestationInfo()
          io.emit('basestation', basestationInfo)
        } catch (error) {
          io.emit('modem_error', {status: 'ERROR', data: error})
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
