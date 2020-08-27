module.exports = {
    port: process.env.PORT || 8081,
    db: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/ConnectionTest'
    },
    modem: {
      port: process.env.MODEM_PORT || '/dev/ttyUSB2',
      baudRate: process.env.BAUDRATE || 115200,
      debug: process.env.MODEM_DEBUG_MODE || false,
    }
}
