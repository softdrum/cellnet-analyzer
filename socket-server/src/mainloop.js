const telemetry = require('./modules/telemetry')
/** Performs measurements and emits them to every socket client
 * that is subscribed to topics
 */

module.exports = {
  start (modem, io) {
    const modemService = require('./services/modem.service')(modem)
    setInterval(async () => {
      let isModemBusy = modem.getBusyMode()
      if (!isModemBusy) {
        try {
          let signalQuality = await modemService.getSignalQuality()
          io.emit('signal_quality', signalQuality)
          // let basestationInfo = await modemService.getBasestationInfo()
          // io.emit('basestation', basestationInfo)
        } catch (error) {
          io.emit('modem_error', {status: 'ERROR', data: error})
        }
      }
      io.emit('battery_level', Math.random()*100)
      let cpuInfo = await telemetry.cpuInfo()
      io.emit('cpu_info', cpuInfo)
      let diskSpace = await telemetry.checkDiskSpace()
      io.emit('disk_space', diskSpace)
      let freeMemory = await telemetry.freeMemory()
      io.emit('freemem_percentage', freeMemory)
    }, 1000)
  }
}
