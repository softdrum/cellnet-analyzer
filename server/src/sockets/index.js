var sockets = {};
/**
 * Initialization of socket io
 * @param {*} server 
 * @param {*} modem 
 */
sockets.init = (server, modem) => {
    /* socket.io setup */
    var io = require('socket.io').listen(server);

    // initialize modem interface
    io.sockets.on('connection', function (socket) {
      /* Send modem uart connection status via socket io */
      const modemIsConnected = modem.getModemConnectionStatus()
      if (modemIsConnected) io.emit('modem_connected', {status: 'SUCCESS', data: 'modem is connected'})
      else io.emit('modem_error', {status: 'ERROR', data: 'modem is disconnected'})
      
      /* Create event listeners */
      require('./socket.routing')(socket, modem)
    });
    return io
}

module.exports = sockets;
