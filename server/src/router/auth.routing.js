const authController = require('../controllers/AuthController')


module.exports = (app) => {
  app.post('/api/register', authController.register)
  app.post('/api/login', authController.login)
}
