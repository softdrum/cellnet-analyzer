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
      let icon;
      switch (element.radio) {
        case 'GSM': icon 
      }
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [element.lon, element.lat],
        },
        properties: {
          mcc: element.mcc,
          mnc: element.net,
          radio: element.radio,
          lac: element.area,
          cid: element.cell,
<<<<<<< HEAD
          range: element.range,
=======
          range: parseInt(element.range),
>>>>>>> 242d826c7f2dfd00bf7043af2cffda4a7cd6df94
          createdAt: element.created,
          updatedAt: element.updated,
          title: element.area,
          icon: element.radio.toLowerCase()
        }
      }
    });
    const geodata = {
        type: 'FeatureCollection',
        features: features
    }

    return geodata
  }
}

module.exports = csvDatabase
