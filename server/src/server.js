const app = require('./app')
const server = require('http').createServer(app)
const config = require('./config/config')
const sockets = require('./sockets')
const modem = require('./modem')(config.modem.port, config.modem.baudRate, config.modem.debug)
const mainloop = require('./mainloop')
const { sequelize } = require('./models')

require('./router/routes')(app)

sequelize.sync() //{force: true}
  .then(() => {
      server.listen(config.port)
      console.log(`Server started on port ${config.port}`);
      modem.initModem()
      const io = sockets.init(server, modem)
      mainloop.start(modem, io)
  })
  