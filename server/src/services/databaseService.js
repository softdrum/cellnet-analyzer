const {Signal} = require('../models')
// const {BS} = require('../models')
const csvDatabase = require('../csv/csvDatabase')
const BS = new csvDatabase('saint_petersburg_celltowers')
const readFile = require('../utils/fileReader').readFile;
const path = require('path')
const filepath = path.parse(__dirname).dir + '/csv/geodata.json'
const geoHelper = require('../utils/geo')

function pickTable(tableName) {
  switch (tableName) {
    case 'signals': return Signal
    case 'basestations': return BS
    default: return Signal
  }
}



module.exports = {
  async getGeoJSONSlice (coordinates, radius) {
    const geodata = (await readFile(filepath)).data.features
   
    const data = geodata
          .filter(elem => geoHelper.getDistanceFromLatLonInKm(coordinates, {lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}) <= radius)
    console.log(radius);
    return {
      type: 'FeatureCollection',
      features: data
    }
  },
  async getDataFromDatabaseTable (tableName) {
    const table = pickTable(tableName)
    const data = await table.findAll()
    return data
  },
  async addDataInDatabaseTable (tableName, data) {
    const table = pickTable(tableName)
    await table.bulkCreate(data)
  },
  async removeDataFromDatabaseTable (tableName, dataToDelete) {
    await dataToDelete.foreach(element => {
      tableName.destroy({
        where: {
          id: element.id
        }
      })
    })
  }
}
