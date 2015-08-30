var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
// validation = require('../utils/validation');

var userSchema = new Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    email: {type: String},
    groups: {type:ObjectId, ref: 'Group' }
    //TODO groups
});

var User = mongoose.model('User', userSchema, 'users');

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
            User.create({
                username: 'solara54',
                firstName: 'Mariya',
                lastName: 'Steffanova',
                password: '12345',
                email: 'solara@gmail.com',

            })
                .then(function (user) {

                    console.log(user.username);

                });
            User.create({
                username: 'baretata',
                firstName: 'Zlatko',
                lastName: 'Zlatko',
                password: '12345',
                email: 'baretata@gmail.com'
            }).then(function (user) {

                console.log(user.username);

            });
            User.create({
                username: 'kiko',
                firstName: 'Kiko',
                lastName: 'Kiko',
                password: '12345',
                email: 'kiko@gmail.com'
            }).then(function (user) {

                console.log(user.username);

            });
            User.create({
                username: 'krasi',
                firstName: 'Krasi',
                lastName: 'Stoyanov',
                password: '12345',
                email: 'krasi@gmail.com'
            }).then(function (user) {

                console.log(user.username);

            });
        }
    });
};