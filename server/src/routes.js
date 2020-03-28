const authController = require('./controllers/AuthController')
const modemController = require('./controllers/ModemController')

module.exports = (app) => {
  app.post('/register', authController.register)
  app.post('/login', authController.login)
  app.get('/data', modemController.getData)
}