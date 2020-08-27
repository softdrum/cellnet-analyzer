const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.0.103:8080'}));

require('./router')(app, express)


module.exports = app
