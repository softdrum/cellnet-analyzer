const fs = require('fs')
const path = require('path')

module.exports = (app, express) => {
  fs.readdirSync(__dirname)
      .filter((file) => file !== 'index.js')
      .forEach((file) => {
          if (file === 'static.routing.js') require(path.join(__dirname, file))(app, express)
          else require(path.join(__dirname, file))(app)
  })
}
