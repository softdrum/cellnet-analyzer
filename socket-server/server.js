const server = require('http').createServer();
const socketIO = require('./src/sockets');
const config = require('./src/config');
const createModem = require('./src/modules/modem');

const modem = createModem(config.modem.port, config.modem.baudRate, config.modem.mock);

server.listen(config.port, async () => {
  const isModemConnected = await modem.initModem()
  if (isModemConnected) {
    socketIO.init(server, modem)
  }
  console.log(`Server started on port ${config.port}`);
});
