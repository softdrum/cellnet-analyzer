// Bring Mongoose into the app 
const mongoose = require( 'mongoose' );
const config = require('../config')
// Build the connection string 
const DB_ADDRESS = config.db.addr;
const DB_PORT = config.db.port;
const DB_NAME = config.db.name;
const DB_URL = `mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`; 


module.exports = {
  init () {
    // Create the database connection 
    mongoose.connect(DB_URL, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        reconnectTries: 10,
        reconnectInterval: 1000, // Reconnect every 500ms
        poolSize: 10 // Maintain up to 10 socket connections
     }
    )
    .then( () => {
        'Mongoose connected'
     })
    .catch(error => {
      console.log(error);
    })
    mongoose.set('useFindAndModify', false);
      
    // If the connection throws an error
    mongoose.connection.on('error',function (err) { 
      console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () { 
      console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {   
      mongoose.connection.close(function () { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      }); 
    }); 
  }
}

