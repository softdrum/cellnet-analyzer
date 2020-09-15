module.exports = {
    port: process.env.PORT || 8083,
    modem: {
      port: process.env.MODEM_PORT || '/dev/ttyUSB2',
      baudRate: process.env.MODEM_BAUDRATE || 115200,
      mock: process.env.MODEM_MOCK_MODE || false,
    }
}
