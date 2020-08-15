module.exports = (socket, modem) => {
  const modemController = require('../controllers/modem.controller')(modem)

  socket.on('changeMode', modemController.changeNetworkMode);
  socket.on('getSignalQuality', modemController.getSignalQuality);
  socket.on('getAvailableOperators', modemController.getAvailableOperators);
  socket.on('getGeoLocation', modemController.getGeoLocation);
  socket.on('getMeasureData', modemController.getMeasureData);
  socket.on('setLogMode', modemController.setLogMode);
}
