const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const Modem = require('./utils/modem')
const sim7600 = new Modem('/dev/ttyUSB2', 115200)
const raspberry = require('./utils/raspberry')
sim7600.openModemConnection()
setInterval(() => {
  // sim7600.getSignalQuality().then(response => {
  //   console.log(response);
  //   // socket.emit(response.topic, response.data)
  // })
  // sim7600.getAvailableOperators().then(response => {
  //   console.log(response);
  //   // socket.emit(response.topic, response.data)
  // })
  // raspberry.cpuUsage().then(response => {
  //   console.log(response);
  // })
  raspberry.cpuTemp().then(response => {
    console.log(response);
  })
  // raspberry.freeMemory().then(response => {
  //   console.log(response);
  // })
}, 1000)
io.on('connection', (socket) => {
  console.log('IO CONNECTED');
  
})
module.exports = {
  app, server
}

