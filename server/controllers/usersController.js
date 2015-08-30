var User = require('mongoose').model('User');

module.exports = {
    login: function (userRequest, next) {
        User.findOne({
            'username': userRequest.username,
            'password': userRequest.password
        }, function (err, user) {
            if (err) {
                console.log('Error searching in db: ' + err);
                return next({error: 404});
            } else if (user) {
                console.log('yep, found user');
                if (userRequest.password === user.password) {
                    return next(null, user);
                }
            } else {
                return next({error: 404});
            }
        });
    },
    logout: function () {

    },
    signup: function (userRequest, next) {
        User.findOne({username: userRequest.username}, function (err, user) {
            if (err) {

                next(err);
                return;
            } else if (user) {
                console.log(user);
                next({error: 422});
                return;
            } else {
                User.create({
                    username: userRequest.username,
                    firstName: 'Test',
                    lastName: 'Testov',
                    password: userRequest.password,
                    email: userRequest.email
                });
                next(null, userRequest);
                return;
            }
        })
    }
};