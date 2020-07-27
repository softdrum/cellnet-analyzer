const dataController = require('../controllers/data.controller')


module.exports = (app) => {
  app.post('/api/remove', dataController.removeData)
  app.post('/api/addData', dataController.addData)
  app.post('/api/getData', dataController.getData)
  app.post('/api/getGeoJSONData', dataController.getGeoJSONData)
  app.post('/api/saveGeoJSON', dataController.saveGeoJSON)
}
