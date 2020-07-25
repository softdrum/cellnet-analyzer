const csvDatabase = require('./csvDatabase');
const BS = new csvDatabase('saint_petersburg_celltowers')
const fs = require('fs');

BS.createGeoJSON()
  .then (result => {
    console.log('writing');
    fs.writeFile('geodata.json', result, (err) => {
      if (err) {
        console.log(err);
      }
    })
    console.log('SUCCESS');
  })

