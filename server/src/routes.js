const authController = require('./controllers/AuthController')
const modemController = require('./controllers/ModemController')
const dataController = require('./controllers/DataController')

module.exports = (app) => {
  app.post('/api/register', authController.register)
  app.post('/api/login', authController.login)
  app.post('/api/remove', dataController.removeData)
  app.post('/api/addData', dataController.addData)
  app.post('/api/getData', dataController.getData)
  app.post('/api/data', modemController.getData)
  app.get('/api/signal', dataController.getSignalLevelData)
}
