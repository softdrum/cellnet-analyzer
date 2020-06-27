const {Signal} = require('../models')
// const {BS} = require('../models')
const csvDatabase = require('../csv/csvDatabase')
const BS = new csvDatabase('saint_petersburg_celltowers')

function pickTable(tableName) {
  switch (tableName) {
    case 'signals': return Signal
    case 'basestations': return BS
    default: return Signal
  }
}

module.exports = {
  async getGeoJSON (tableName) {
    console.log(tableName);
    const table = pickTable(tableName)
    const data = await table.createGeoJSON()
    return data
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
