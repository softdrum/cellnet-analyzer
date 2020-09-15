const telemetry = require('./modules/telemetry');
const isUPSMockMode = require('./config').ups.mock;
const upsHat = require('./modules/UPSHat')(0x36, isUPSMockMode);
/** Performs measurements and emits them to every socket client
 * that is subscribed to topics
 */

module.exports = {
  start (modem, io) {
    const modemService = require('./services/modem.service')(modem)
    setInterval(async () => {
      let isModemBusy = modem.getBusyMode();
      if (!isModemBusy) {
        try {
          let signalQuality = await modemService.getSignalQuality();
          io.emit('signal_quality', signalQuality);
          let basestationInfo = await modemService.getBasestationInfo();
          io.emit('basestation', basestationInfo);
        } catch (error) {
          console.log(error);
          // io.emit('modem_error', {status: 'ERROR', data: error})
        }
      }
      let batteryInfo = await upsHat.getBatteryInfo();
      io.emit('battery_info', batteryInfo); 
      let cpuInfo = await telemetry.cpuInfo();
      io.emit('cpu_info', cpuInfo);
      let diskSpace = await telemetry.checkDiskSpace();
      io.emit('disk_space', diskSpace);
      let freeMemory = await telemetry.freeMemory();
      io.emit('freemem_percentage', freeMemory);
    }, 1000)
  }
}
