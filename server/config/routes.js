var User = require('mongoose').model('User');

module.exports = function (app) {

    app.get('/User', function (req, res, next) {
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

    });

    app.post('/signup', function (req, res, next) {
        console.log('On server POSTing');
        console.log(req.body);
        console.log('..end server..');
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
                User.create({
                    username: newUser.username,
                    firstName: 'Test',
                    lastName: 'Testov',
                    password: newUser.password,
                    email: newUser.email
                });

                res.json({username: newUser.username, password: newUser.password});
            }
        });
        // TODO: simple validation of fortmat of email. pass...
        // DONE: check if the user is already registred
        // DONE: if not -> send data to database and return success

    })
};
