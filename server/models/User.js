var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// validation = require('../utils/validation');

var userSchema = new Schema({
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    authKey: {type: String},
    email: {type: String},
    aboutMe: {type: String},
    groups: [{type: ObjectId, ref: 'Group'}]
    //TODO groups
});

var User = mongoose.model('User', userSchema, 'users');


module.exports.createInitialUsers = function () {
    console.log('hey');
    User.find({}).exec(function (err, users) {

        if (err) {
            console.log("Error! No such table in db! : " + err);
            return;
        }
        console.log("Loading..please wait for next message..");

        if (users.length === 0 || users.length < 5) {
            User.create({
                username: 'Database loaded..No users for testing',
                firstName: 'Mariya',
                lastName: 'Steffanova',
                password: '12345',
                email: 'solara@gmail.com'

            }).then(function (user) {

                console.log(user.username);

            });

        }
    });
};