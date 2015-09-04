var express = require('express');

var app = require('express').createServer();


var env =  process.env.NODE_ENV || 'development';  // make sure we wont touch the database
var config = require('./server/config/config')[env];
var port = config.port;


require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/utils/validation')(app);
require('./server/config/routes')(app);
//var server = require('http').createServer(app);
require('./server/config/sockets')(app);


// TODO: include passport and crypto..maybe
//require('./server/config/passport')();

app.listen(port, function () {
    console.log('Server listening at port %d', port);
});