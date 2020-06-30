const dbService = require('../services/databaseService')

function tablePicker(tableName) {
  switch (tableName) {
    case 'signals': return Signal
    case 'basestations': return BS
    default: return Signal
  }
}
module.exports = {
  async getData(req, res) {
    try {
      const data = await dbService.getDataFromDatabaseTable(req.body.tableName)
      res.send({
          data: data,
      })
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error
        })
    }
  },
  async addData(req, res) {
    try {
      await dbService.addDataInDatabaseTable(req.body.tableName, req.body.data)]
      res.send({
          success: "true",
      })
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error: error
        })
    }
  },
  async removeData(req, res) {
    try {
      await dbService.removeDataFromDatabaseTable(req.body.tableName, req.body.selected)
      res.send({
        success: selected
      })
    } catch (error) {
      console.log('An error occured during removing data');
      console.log(error);
      res.status(400).send({
        success: false,
        error
      })
    }
  }
}
