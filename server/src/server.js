const express = require('express')
const { sequelize } = require('./models')
const config = require('./config/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.0.101:8080'}));
require('./routes')(app)

sequelize.sync()
    .then(() => {
        console.log(`Server started on port ${config.port}`);
        app.listen(config.port)
    })
