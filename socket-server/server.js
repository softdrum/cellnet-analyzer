const server = require('http').createServer();
const socketIO = require('./src/sockets')
const mainloop = require('./src/mainloop')
const config = require('./src/config')
const modem = require('./src/modules/modem')(config.modem.port, config.modem.baudRate, config.modem.mock)


server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
  const isModemConnected = await modem.initModem()
  const io = socketIO.init(server, modem)
  if (isModemConnected) {
    mainloop.start(modem, io)
  }
});
