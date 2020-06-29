var sockets = {};

sockets.init = (server, modem) => {
    /* socket.io setup */
    var io = require('socket.io').listen(server);

    // initialize modem interface
    const modemController = require('./controllers/modemController')(modem)

    io.sockets.on('connection', function (socket) {
      console.log('socket connected');
      
      /* Send modem uart connection status via socket io */
      const modemIsConnected = modem.getModemConnectionStatus()
      if (modemIsConnected) io.emit('modem_connected', {status: 'SUCCESS', data: 'modem is connected'})
      else io.emit('modem_error', {status: 'ERROR', data: 'modem is disconnected'})
      
      /* Create event listeners */
      socket.on('changeMode', modemController.changeNetworkMode);
      socket.on('getSignalQuality', modemController.getSignalQuality);
      socket.on('getGeoLocation', modemController.getGeoLocation);
      socket.on('setLogMode', modemController.setLogMode);
    });
    return io
}

module.exports = sockets;
