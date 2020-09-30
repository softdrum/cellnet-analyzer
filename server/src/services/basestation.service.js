const databaseService = require('../services/database.service')
const mcache = require('../utils/memory.cache').mcache
const geoHelper = require('../utils/geo')

const cacheDuration = 300
const fs = require('fs').promises
const path = require("path");
const appDir = path.dirname(require.main.filename);
let city = 'saint_petersburg'
let prevCity = city
module.exports = {
  async getBasestationsAround (coordinates, radius) {
      let basestations
      console.log('getting data');
      let lat = coordinates.lat;
      let lng = coordinates.lng;
      if ((lat >= 55.123 && lat <= 56.2) && (lng >= 36.8 && lng <= 38.43)) {
        city = 'moscow'
      } else {
        city = 'saint_petersburg'
      }
      if (city === prevCity) {
        const cachedData = mcache.get('basestations')
        if (cachedData) {
          basestations = cachedData
        } else {
          let basestationsJSON = await fs.readFile(`${appDir}/src/geojson/${city}_cells.json`);
          let basestationsArr = JSON.parse(basestationsJSON);
          if (basestationsArr) {
            basestations = basestationsArr
          }
          mcache.put('basestations', basestations, cacheDuration * 1000)
        }
      }
      else {
        let basestationsJSON = await fs.readFile(`${appDir}/src/geojson/${city}_cells.json`);
        let basestationsArr = JSON.parse(basestationsJSON);
        if (basestationsArr) {
          basestations = basestationsArr
        }
        mcache.put('basestations', basestations, cacheDuration * 1000)
      }
      prevCity = city;
      if (coordinates) return geoHelper.filterFeatures(basestations, coordinates, radius)
      return basestations
  },
}
