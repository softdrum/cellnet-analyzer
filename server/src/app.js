const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.0.101:8080'}));

module.exports = app
