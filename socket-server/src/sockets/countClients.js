module.exports = io => {
  return new Promise((resolve, reject) => {
    io.clients((error, clients) => {
      if (error) reject(error)
      else resolve(clients.length)
    })
  })
}