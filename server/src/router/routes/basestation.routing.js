const basestationController = require('../../controllers/basestation.controller')


module.exports = (app) => {
  app.get('/api/basestation', basestationController.getBasestations)
}
