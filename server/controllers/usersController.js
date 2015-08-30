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
    logout: function(){

    },
    signup: function(){

    }
};
