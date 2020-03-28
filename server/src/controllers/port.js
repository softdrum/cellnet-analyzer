const SerialPort = require('serialport')

function port() {
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
    
   
    return port
}
module.exports = port