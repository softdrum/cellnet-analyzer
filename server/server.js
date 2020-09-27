const app = require('./src/app')
const server = require('http').createServer(app)
const config = require('./src/config')
const mongoDB = require('./src/database')


/**
 * Main node js server app file
 */
server.listen(config.port, async () => {
  console.log(`Server started on port ${config.port}`);
  // mongoDB.init()
})
  