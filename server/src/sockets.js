var sockets = {};

sockets.init = (server, modem) => {
    // initialize modem interface
    const modemController = require('./controllers/modemController')(modem)
    /* socket.io setup */
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
      console.log('socket connected');
      /* Create event listeners */
      socket.on('changeMode', modemController.changeNetworkMode);
      socket.on('setLogMode', modemController.setLogMode);
    });
    return io
}

module.exports = sockets;
