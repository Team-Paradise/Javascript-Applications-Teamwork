var mongoose = require('mongoose');
   // validation = require('../utils/validation');

var userSchema = mongoose.Schema({
        username: {type: String},
        firstName: {type: String},
        lastName: {type: String}/*,
        password: {type: String},
        email: {type: String}*/
        //TODO groups
    });

  var  User = mongoose.model('User', userSchema,'users');

/*userSchema.method({
    authenticate: function (password) {
        if (validation.validateUser(this.username, password) === this.password) {
            return true;
        }
        else {
            return false;
        }
    }
});*/

module.exports.createInitialUsers = function () {
    console.log('hey');
    User.find({}).exec(function (err, users) {

        if (err) {
            console.log("Error! No such table in db! : " + err);
            return;
        }
        console.log("Creating users..");

        if (users.length === 0 || users.length < 5) {
            User.create({username: 'solara54', firstName: 'Mariya', lastName: 'Steffanova'}).then(function (user) {

                console.log(user.username);

            });
            User.create({username: 'baretata', firstName: 'Zlatko', lastName: 'Zlatko'}).then(function (user) {

                console.log(user.username);

            });
            User.create({username: 'kiko', firstName: 'Kiko', lastName: 'Kiko'}).then(function (user) {

                console.log(user.username);

            });
            User.create({username: 'krasi', firstName: 'Krasi', lastName: 'Stoyanov'}).then(function (user) {

                console.log(user.username);

            });
        }
    });
};