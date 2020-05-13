const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

class Port {
  constructor (portName, baudrate) {
    const port = new SerialPort(portName,{
      baudRate: baudrate
    })
    const parser = new Readline()
    port.pipe(parser)

    this.port = port
    this.parser = parser
  }
  readBuffer (buffer) {
    return buffer.toString('utf-8')
  }
}
module.exports = Port
// '/dev/ttyUSB2'
// "(?<operator>\d+)",\d\)
