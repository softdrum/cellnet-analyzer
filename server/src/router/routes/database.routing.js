const dataController = require('../../controllers/data.controller')


module.exports = (app) => {
  app.post('/api/database/:collection', dataController.createDocument)
  app.get('/api/database/:collection', dataController.readCollection)
  app.get('/api/database/:collection/latest', dataController.findLatest)
  app.get('/api/database/:collection/:id', dataController.readDocument)
  app.put('/api/database/:collection/:id', dataController.updateDocument)
  app.delete('/api/database/:collection/:id', dataController.deleteDocument)
}
