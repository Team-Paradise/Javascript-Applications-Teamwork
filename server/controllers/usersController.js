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
            'username': req.query.username,
            'password': req.query.password
        }, function (err, user) {
            if (err) {
                console.log('Error searching in db: ' + err);
                res.sendStatus(404);
            } else if (user) {
                if (req.query.password === user.password) {
                    res.json(user); // move out in promise
                }
            }
            else {
                res.sendStatus(404);
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
                res.sendStatus(404);
            } else if (user) {
                res.sendStatus(422);

            }
            else {
                var newUser = req.body;
                newUser.authKey = generateAuthKey(newUser.username);
                User.create(newUser);
                console.log('----------SIGN UP');
                console.log(newUser);
                res.json({username: newUser.username, authKey: newUser.authKey});
            }
        });
    }
};
