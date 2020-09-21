const path = require("path");
const appDir = path.dirname(require.main.filename);

module.exports = (app, express) => {
  app.use('/static', express.static(path.join(appDir, '/public')))
}
