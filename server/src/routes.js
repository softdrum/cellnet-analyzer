const authController = require('./controllers/AuthController')
module.exports = (app) => {
    app.post('/register', authController.register)
    app.post('/login', authController.login)
}