const path = require('path')
const root = path.dirname(process.cwd());


module.exports = (app, express) => {
  app.use('/static', express.static(path.join(root, '/server/public')))
}
