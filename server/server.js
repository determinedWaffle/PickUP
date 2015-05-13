var express = require('express');

//creates an express application
var app = express();

//allows port to be changed if the app is delpoyed.
//will referenced port 3000 on localhost
var PORT  = process.env.PORT || 3000;

//injects the express application into the middleware file
require('./config/middleware.js')(app, express);

//tells the express application which port to listen on
var server = app.listen(PORT, function () {
  var host = server.address().address;
  console.log('Example app listening at http://%s:%d', host, PORT);
});

module.exports = app;
