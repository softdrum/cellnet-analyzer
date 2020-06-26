const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const Modem = require('./utils/modem/modem')
const sim7600 = new Modem('/dev/ttyUSB2', 115200)
const raspberry = require('./utils/raspberry')
sim7600.openModemConnection()
function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

setInterval(() => {
  
  if (!sim7600.settingsMode) {
    sim7600.getBasestationInfo().then(response => {
      console.log(response);
      io.emit('basestation', response)
    })
    .catch(error => {
      console.log(error)
    })
  }
  // sim7600.getAvailableOperators().then(response => {
  //   console.log(response);
  //   socket.emit(response.topic, response.data)
  // })
  sim7600.getSignalQuality().then(response => {
    console.log(response);
    io.emit(response.topic, response.data)
  })
  .catch(error => {
    console.log(error);
  })
  .catch(error => {
    console.log(error);
  })
  raspberry.cpuInfo().then(response => {
    // console.log('INFO', response);
    io.emit('cpu_info', response)
  })
  raspberry.checkDiskSpace().then(response => {
    // console.log(response);
    io.emit('disk_space', response)
  })
  raspberry.freeMemory().then(response => {
    io.emit('freemem_percentage', response)
    console.log(response);
  })
}, 1000)
io.on('connection', (socket) => {
  console.log('IO CONNECTED');
  socket.on('changeMode', (mode, callback) => {
    if (!sim7600.settingsMode) {
      sim7600.settingsMode = true
      sleep(5000).then(() => {
        sim7600.changeMode(mode)
        .then(response => {
          console.log(response)
          sim7600.settingsMode = false
          callback({msg: 'success'})
        })
        .catch(error => {
          sim7600.settingsMode = false
          callback({msg: error})
          // socket.emit('modemError', {msg: error})
        })
      })
    } else {
      sim7600.settingsMode = false
      callback({msg: 'modem is busy'})
      // socket.emit('modemError', {msg:'modem is busy'})
    }
  })
})
module.exports = {
  app, server
}

