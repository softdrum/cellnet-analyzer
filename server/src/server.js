const express = require('express')
const { sequelize } = require('./models')
const config = require('./config/config')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
require('./routes')(app)


sequelize.sync()
    .then(() => {
        console.log(`Server started on port ${config.port}`);
        app.listen(config.port)
    })