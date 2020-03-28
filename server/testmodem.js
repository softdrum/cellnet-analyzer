const SerialPort = require('serialport')

const port = new SerialPort('/dev/ttyUSB2', {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    flowControl: false
})
port.on('open', (error) => {
    if (!error) {
        console.log('Port opened');
    }
})
port.write('AT\r\n')

port.on('data', (data) => {
    console.log(`Data: ${data}`);
})
