var express = require('express'),
    app = express(),
    passport = require('passport'),
    LocalPassport = require('passport-local'),
    mongoose = require('mongoose');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// TODO: app.set !

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
//app.get partials

var env = /* process.env.NODE_ENV ||*/ 'development';  // make sure we wont touch the database

// proccess.env.PORT is set by heroku. If we are on localhost, the port will be 3000
var port = process.env.PORT || 3000;

//TODO: config passport for the login / logout
passport.use(new LocalPassport(function (username, password, done) {
    User.findOne({username: username}).exec(function (err, user) {
        if (err) {
            console.log('Error loading user: ' + err);
            return;
        }

        if (user && user.authenticate(password)) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
}));

passport.serializeUser(function (user, done) {
    if (user) {
        return done(null, user._id);
    }
});

passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}).exec(function (err, user) {
        if (err) {
            console.log('Error loading user: ' + err);
            return;
        }

        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
});

//TODO: add crypto for the authentication

//TODO: config mongoose (db)
if (env == 'development') {
    mongoose.connect('mongodb://localhost/paradiseProject'); // local database
} else {
    mongoose.connect('mongodb://teamparadise:yellowsubmarine@ds035653.mongolab.com:35653/paradiseproject');
}

var db = mongoose.connection;

db.once('open', function (error) {
    if (error) {
        console.log("Failed to connect to database: " + error);
    } else {
        console.log("Database feeling fine and running");
    }
});

var userSchema = mongoose.Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String}
});

var User = mongoose.model('User', userSchema);

User.create({username: 'solara', firstName: 'Mariya', lastName: 'Steffanova'}).then(function (user) {

    console.log(user.username);

});

//TODO: find nodemon so you can stop restarting your server every 5 minutes like an idiot!

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});


//TODO: config socket.io for the chat

io.sockets.on('connection', function (socket) {
    socket.on('sent-message', function (data) {  // data = message
        io.sockets.emit('new-message', data);
    });
});

