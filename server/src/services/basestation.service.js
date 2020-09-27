const databaseService = require('../services/database.service')
const mcache = require('../utils/memory.cache').mcache
const geoHelper = require('../utils/geo')

const cacheDuration = 300
const fs = require('fs').promises
const path = require("path");
const appDir = path.dirname(require.main.filename);

module.exports = {
  async getBasestationsAround (coordinates, radius) {
      let basestations
      console.log('getting data');
      if ((lat >= 55.123 && lat <= 56.2) && (lng >= 36.8 && lng <= 38.43)) {
        city = 'moscow'
      } else {
        'saint_petersburg'
      }
      const cachedData = mcache.get('basestations')
      if (cachedData) {
        basestations = cachedData
      }
      else {
        let basestationsJSON = await fs.readFile(`${appDir}/src/geojson/${city}.json`);
        let basestationsArr = JSON.parse(basestationsJSON);
        if (basestationsArr) {
          basestations = basestationsArr
        }
        mcache.put('basestations', basestations, cacheDuration * 1000)
      }
      if (coordinates) return geoHelper.filterFeatures(basestations, coordinates, radius)
      return basestations
  },
}
