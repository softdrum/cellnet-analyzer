module.exports = (socket, modem) => {
  const socketController = require('../controllers/socket.controller')(modem)

  socket.on('changeMode', socketController.changeNetworkMode);
  socket.on('getSignalQuality', socketController.getSignalQuality);
  socket.on('getAvailableOperators', socketController.getAvailableOperators);
  socket.on('getGeoLocation', socketController.getGeoLocation);
  socket.on('getMeasureData', socketController.getMeasureData);
}
