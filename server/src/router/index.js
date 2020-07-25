module.exports = (app) => {
  require('./auth.routing')(app)
  require('./database.routing')(app)
}
