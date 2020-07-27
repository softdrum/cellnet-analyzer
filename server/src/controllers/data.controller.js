const dbService = require('../services/database.service')

module.exports = {
  async saveGeoJSON (req, res) {
    try {
      console.log('Saving geojson data...');
      console.log(req.body);
      const data = await dbService.saveGeoJSON(req.body);
      res.send('OK');
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error
        })
    }
  },
  async getGeoJSONData (req, res) {
    try {
      console.log('Getting geojson slice...');
      console.log(req.body);
      const data = await dbService.getGeoJSONSlice(req.body.coordinates, req.body.radius);
      console.log('sending data...');
      res.send(data);
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(400).send({
            error
        })
    }
  },
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
      await dbService.addDataInDatabaseTable(req.body.tableName, req.body.data)
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
