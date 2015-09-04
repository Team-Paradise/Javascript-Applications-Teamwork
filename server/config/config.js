// borrowed from Ivaylo Kenov's github. Thanks :)

var path = require('path'),
    rootPath = path.normalize(__dirname + '../../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/paradiseProject',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://teamparadise:yellowsubmarine@ds035653.mongolab.com:35653/paradiseproject',
        port: process.env.PORT || 3000
    }
};
