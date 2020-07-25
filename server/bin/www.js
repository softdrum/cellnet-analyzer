const app = require('../src/app')
const server = require('http').createServer(app)
const config = require('../src/config/config')
const sockets = require('../src/sockets/sockets')
const modem = require('../src/modem')(config.modem.port, config.modem.baudRate, config.modem.debug)

const mainloop = require('../src/mainloop')
const { sequelize } = require('../src/models')


sequelize.sync() //{force: true}
  .then(async () => {
      server.listen(config.port)
      console.log(`Server started on port ${config.port}`);
      const modemIsConnected = await modem.initModem()
      const io = sockets.init(server, modem)
      if (modemIsConnected) {
        mainloop.start(modem, io)
      }
  })
  