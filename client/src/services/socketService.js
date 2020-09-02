export default {
  emit (socket, eventName, message=null) {
    return new Promise ((resolve, reject) => {
      if (message) {
        socket.client.emit(eventName, message, response => {
          if (response.status === 'ERROR') reject(response.payload)
          else {
            resolve(response.payload)
          }
        });
      } else {
        socket.client.emit(eventName, response => {
          if (response.status === 'ERROR') reject(response.payload)
          else {
            resolve(response.payload)
          }
        });
      }
    })
  }
}
