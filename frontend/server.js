const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const config= require('./config');
// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests 
app.use(staticFileMiddleware);

// Support history api 
app.use(history({
  index: '/dist/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

app.listen(config.port, function () {
  console.log('Frontend server started on port ', config.port);
});
