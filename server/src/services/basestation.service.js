const databaseService = require('../services/database.service')
const mcache = require('../utils/memory.cache').mcache
const geoHelper = require('../utils/geo')

const cacheDuration = 300


module.exports = {
  async getBasestationsAround (coordinates, radius) {
      let basestations
      console.log('getting data');
      const cachedData = mcache.get('basestations')
      if (cachedData) {
        basestations = cachedData
      }
      else {
        basestations = await databaseService.getDocumentsFromCollection('Basestation', {})
        console.log(basestations.length);
        mcache.put('basestations', basestations, cacheDuration * 1000)
      }
      if (coordinates) return geoHelper.filterFeatures(basestations, coordinates, radius)
      return basestations
  },
}
