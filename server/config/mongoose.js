var mongoose = require('mongoose'),
    User = require('../models/User');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function (error) {
        if (error) {
            console.log("Failed to connect to database: " + error);
            return;
        } else {
            console.log("Database feeling fine and running");
            mongoose.connection.db.dropDatabase();
            console.log('----------');
            console.log("Database droped..");
        }
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    User.createInitialUsers();
};