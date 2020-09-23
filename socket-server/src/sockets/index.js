var sockets = {};
/**
 * Initialization of socket io
 * @param {*} server 
 * @param {*} modem 
 */
const modemMonitor = require('../modem.monitor');
const hardwareMonitor = require('../hardware.monitor');
const countClients = require('./countClients')

sockets.init = (server, modem) => {
  /* socket.io setup */
  var io = require('socket.io').listen(server);

  // initialize modem interface
  io.sockets.on('connection', async socket => {
    try {
      let clientsQuantity = await countClients(io);
      if (clientsQuantity === 1) {
        // starting loops
        hardwareMonitor.begin(io);
        modemMonitor.begin(io, modem);
      }
      /* Create event listeners */
      require('./socket.routing')(socket, modem)
    } catch (error) {
      console.log(error);
    }
    
    socket.on('disconnect', async () => {
      try {
        let clientsQuantity = await countClients(io);
        if (clientsQuantity === 0) {
          // starting loops
          hardwareMonitor.stop();
          modemMonitor.stop();
        }
      } catch (error) {
        console.log(error);
      }
    })
  });
  return io
}

module.exports = sockets;
