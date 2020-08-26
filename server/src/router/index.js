const fs = require('fs')
const path = require('path')
const routesPath = __dirname + '/routes/'
console.log(routesPath);

module.exports = (app, express) => {
  fs.readdirSync(routesPath)
      .filter((file) => file !== 'index.js')
      .forEach((file) => {
          if (file === 'static.routing.js') require(path.join(routesPath, file))(app, express)
          else require(path.join(routesPath, file))(app)
  })
}
