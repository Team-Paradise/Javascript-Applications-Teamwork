Users = require('mongoose').model('User');

/*function auth(req, res, next) {
    var authKey = req.headers['x-authkey'];
    if (!authKey) {
        req.user = null;
        next();
        return;
    }
    Users.find({
        authKey: authKey
    })
        .then(function(users) {
            var user = users[0] || null;
            req.user = user;
            next();
        }, function(err) {
            console.log('------NOPE :D');
            res.status(404)
                .json(err);
        });
}*/

module.exports = function(app) {
   // console.log('------------AUTH');
   // app.get('/', auth);
   // app.get('/groups', auth);
   // app.get('/users', auth);
};