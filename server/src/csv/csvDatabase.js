const csvParser = require('csv-parser')
const csvWriter = require('csv-writer')
const fs = require('fs')

class csvDatabase {
  constructor (table) {
    this.table = table
  }
  findAll () {
    return new Promise ((resolve, reject) => {
      let tableBuffer = []
      console.log(`Executing ${this.table} data from csv database`);
      fs.createReadStream(`${__dirname}/tables/${this.table}.csv`)
      .pipe(csvParser())
      .on('data', (data) => {
        tableBuffer.push(data)
      })
      .on('end', () => {
        console.log(`SCV read success`);
        resolve(tableBuffer)
      })
      .on('error', (error) => {
        reject(error)
      }) 
    })
  }
  async createGeoJSON () {
    const data = await this.findAll()
    const features = data.map(element => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [element.lat, element.lon],
        },
        properties: {
          mcc: element.mcc,
          mnc: element.net,
          radio: element.radio,
          lac: element.area,
          range: element.range,
          createdAt: element.created,
          updatedAt: element.updated,
          icon: 'bs1'
        }
      }
    });
    const geodata = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    }

    return JSON.stringify(geodata)
  }
}

module.exports = csvDatabase
