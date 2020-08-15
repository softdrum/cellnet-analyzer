const app = require('../src/app')
const server = require('http').createServer(app)
const config = require('../src/config/config')
const socketIO = require('../src/sockets')
const modem = require('../src/modem')(config.modem.port, config.modem.baudRate, config.modem.debug)
const mongoDB = require('../src/database').init()

const mainloop = require('../src/mainloop')

server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
  const modemIsConnected = await modem.initModem()
  const io = socketIO.init(server, modem)
  if (modemIsConnected) {
    mainloop.start(modem, io)
  }
})
  