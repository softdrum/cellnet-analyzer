const createModemService = require('./services/modem.service');
const LOOP_INTERVAL = 1000;
/** Performs measurements and emits them to every socket client
 * that is subscribed to topics
 */
let interval = null;
// creating modem instance
module.exports = {
  begin (io, modem) {
    let modemService = createModemService(modem);
    console.log('START MODEM MONITOR');
    interval = setInterval(async () => {
      let isModemBusy = modemService.getModemBusyMode();
      if (!isModemBusy) {
        try {
          let sq = await modemService.getSignalQuality();
          let bs = await modemService.getBasestationInfo();
          io.emit('modem_info', {
            sq,
            bs,
            timestamp: new Date()
          });
        } catch (error) {
          io.emit('modem_error', {status: 'ERROR', data: error});
        }
      }
    }, LOOP_INTERVAL)
  },
  stop () {
    console.log('Stoping monitor');
    clearInterval(interval);
  }
}
