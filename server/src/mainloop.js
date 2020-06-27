const raspberry = require('./utils/raspberry')
module.exports = {
  init (modem, io) {
    setInterval(() => {
      if (!modem.isBusy) {
        modem.getBasestationInfo().then(response => {
          // console.log(response);
          io.emit('basestation', response)
        })
        .catch(error => {
          console.log(error)
        })
        // sim7600.getAvailableOperators().then(response => {
        //   console.log(response);
        //   socket.emit(response.topic, response.data)
        // })
        modem.getSignalQuality().then(response => {
          // console.log(response);
          io.emit(response.topic, response.data)
          // if (sim7600.logMode) return Signal.Create(response.data)
          console.log(response)
          return 'logger off'
        })
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error);
        })
      }
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
        // console.log(response);
      })
    }, 1000)
  }
}
