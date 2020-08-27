const app = require('../src/app')
const server = require('http').createServer(app)
const config = require('../src/config/config')
const socketIO = require('../src/sockets')
const modem = require('../src/modules/modem')(config.modem.port, config.modem.baudRate, config.modem.debug)
const mongoDB = require('../src/database')

const mainloop = require('../src/mainloop')

mongoDB.init()

server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
  const isModemConnected = await modem.initModem()
  const io = socketIO.init(server, modem)
  if (isModemConnected) {
    mainloop.start(modem, io)
  }
})
  