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
}

module.exports = csvDatabase
