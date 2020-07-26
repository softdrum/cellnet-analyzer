module.exports = (app, express) => {
  require('./auth.routing')(app)
  require('./database.routing')(app)
  require('./static.routing')(app, express)
}
