
const fs = require('fs').promises;
fs.readFile(__dirname + '/geodata.json', 'utf8').then(result => {
  let obj = JSON.parse(result);
  let features = obj.data.features.slice();
  fs.writeFile('bs_import.json', JSON.stringify(features)).then(result => {
    console.log(features.length);
  })
});
