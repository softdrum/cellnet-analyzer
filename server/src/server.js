const express = require('express')
var mqtt = require('mqtt');
var mosca = require('mosca');
const { sequelize } = require('./models')
const config = require('./config/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:8080'}));
require('./routes')(app)

var settings = {
  port:1883
  }

var server = new mosca.Server(settings);

server.on('ready', function(){
  console.log("broker ready");
});
var client  = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
  client.publish('myTopic', 'Hello mqtt');
  // setInterval(function() {
  // client.publish('myTopic', 'Hello mqtt');
  // console.log('Message Sent');
  // }, 5000);
  });

var client  = mqtt.connect('mqtt://localhost:1883')
client.on('connect', function () {
    client.subscribe('myTopic')
})
setTimeout(() => {
  client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context)
  })
}, 5000);
sequelize.sync() //{force: true}
    .then(() => {
        console.log(`Server started on port ${config.port}`);
        app.listen(config.port)
    })
