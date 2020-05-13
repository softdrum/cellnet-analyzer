const {app, server} = require('./app')
const { sequelize } = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config/config')
require('./routes')(app)

app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.0.101:8080'}));

sequelize.sync() //{force: true}
    .then(() => {
        console.log(`Server started on port ${config.port}`);
        server.listen(config.port)
    })
