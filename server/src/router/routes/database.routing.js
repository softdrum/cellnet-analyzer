const dataController = require('../../controllers/data.controller')
const cache = require('../../utils/memory.cache').cache


module.exports = (app) => {
  app.post('/api/database/:collection', dataController.createDocument)
  app.get('/api/database/:collection', cache(10), dataController.readCollection)
  app.get('/api/database/:collection/latest', cache(10), dataController.findLatest)
  app.get('/api/database/:collection/:id', cache(10), dataController.readDocument)
  app.put('/api/database/:collection/:id', dataController.updateDocument)
  app.delete('/api/database/:collection/:id', dataController.deleteDocument)
}
