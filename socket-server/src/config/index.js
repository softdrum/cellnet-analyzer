module.exports = {
    port: process.env.PORT || 8082,
    modem: {
      port: process.env.MODEM_PORT || '/dev/ttyUSB2',
      baudRate: parseInt(process.env.MODEM_BAUDRATE) || 115200,
      mock: process.env.MODEM_MOCK_MODE === 'T',
    },
    ups: {
      mock: process.env.UPS_MOCK_MODE || false,
    }
}
