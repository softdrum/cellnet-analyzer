const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const Modem = require('./utils/modem')
const sim7600 = new Modem('/dev/ttyUSB2', 115200)
sim7600.openModemConnection()
setInterval(() => {
  sim7600.getAvailableOperators().then(response => {
    console.log(response);
    // socket.emit(response.topic, response.data)
  })
}, 1000)
io.on('connection', (socket) => {
  console.log('IO CONNECTED');
  
})
module.exports = {
  app, server
}

