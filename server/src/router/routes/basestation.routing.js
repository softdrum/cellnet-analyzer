const basestationController = require('../../controllers/basestation.controller')

/**
 * Routes for basestation collection in mongo db
 * @param {*} app 
 */
module.exports = (app) => {
  app.get('/api/basestation', basestationController.getBasestations)
}
