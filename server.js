var express = require('express'),
    app = express();

var env = /* process.env.NODE_ENV ||*/ 'development';  // make sure we wont touch the database
var config = require('./server/config/config')[env];
var port = config.port;
var server = require('http').createServer(app);

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/sockets')(server);

// TODO: include passport and crypto..maybe
//require('./server/config/passport')();

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});