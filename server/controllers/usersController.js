var User = require('mongoose').model('User');

function generateAuthKey(username) {
    return username + '545454';
}

module.exports = {
    login: function (req, res, next) {
        console.log('been here');
        //middleware
        //TODO: module + promises -> send response only when the query to db is ready!
        // TODO: dont send the pass to the client, hash the pass before sending to db (crypto)
        User.findOne({
            'username': req.body.username,
            'passHash': req.body.passHash
        }, function (err, user) {
            if (err) {
                console.log('Error searching in db: ' + err);
                res.status(404);
                next();
            } else if (user) {
                if (req.body.passHash === user.passHash) {
                    res.json(user); // move out in promise
                    next();
                }
            }
            else {
                res.status(404);
                next();
            }
        });

    },
    logout: function () {

    },
    signup: function (req, res, next) {
        User.findOne({
            'username': req.body.username
        }, function (err, user) {
            if (err) {
                console.log('Error searching in db: ' + err);
                res.status(404);
                next();
            } else if (user) {
                res.status(422);
                next();

            }
            else {
                var newUser = req.body;
                newUser.authKey = generateAuthKey(newUser.username);
                newUser.groups = [];
                var userToSave = new User(newUser);
                userToSave.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(this);
                });
                console.log('----------SIGN UP');
                console.log(userToSave);
                res.json({username: newUser.username, authKey: newUser.authKey});
                next();
            }
        });
    }
};
