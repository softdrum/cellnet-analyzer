const authController = require('./controllers/AuthController')
const modemController = require('./controllers/ModemController')
const dataController = require('./controllers/DataController')

module.exports = (app) => {
  app.post('/register', authController.register)
  app.post('/login', authController.login)
  app.get('/data', modemController.getData)
  app.get('/signal', dataController.getSignalLevelData)
}
