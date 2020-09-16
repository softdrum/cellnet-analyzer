const telemetry = require('./modules/telemetry');
const isUPSMockMode = require('./config').ups.mock;
const upsHat = require('./modules/UPSHat')(0x36, isUPSMockMode);
const LOOP_INTERVAL = 5000;
/** Performs hardware measurements and emits them to every socket client
 * that is subscribed to topics
 */
let interval = null;

module.exports = {
  begin (io) {
    console.log('START HARDWARE MONITOR');
    interval = setInterval(async () => { 
      try {
        let battery = await upsHat.getBatteryInfo();
        let cpu = await telemetry.cpuInfo();
        let disk = await telemetry.checkDiskSpace();
        let ram = await telemetry.freeMemory();
        io.emit('hardware_info', {
          cpu,
          ram,
          disk,
          battery
        });
      } catch (error) {
        io.emit('hardware-error', error)
      }
    }, LOOP_INTERVAL);
  },
  stop () {
    console.log('Stopping hardware monitor');
    clearInterval(interval)
  }
}
