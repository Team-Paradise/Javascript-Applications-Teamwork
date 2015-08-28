var User = require('mongoose').model('User');

module.exports = function(app){

    app.get('/User', function (req, res) {
        console.log('been here');
        var user;
        //middleware
        //TODO: module + promises -> send response only when the query to db is ready!
        User.find({
            'username': req.query.username
        }, function (err, users) {
            if (err) {
                console.log('Error searching in db: ' + err);
            } else {
                user = users[0].username;
                res.json(user); // move out in promise
            }
        });

    });
};
