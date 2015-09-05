Users = require('mongoose').model('User');

function auth(req, res, next) {
    console.log('-----------------IN AUTH');
    var authKey = req.headers['x-authkey'];
    if (!authKey) {
        console.log('-----------NO AUTH KEY')
        req.user = null;
        res.status(401).json({message: 'You have to be login to access this page!'});
        return;  next();

    }
    Users.findOne({
        authKey: authKey
    }, function (err, users) {
        if (err) {
            console.log('------NOPE :D');
            res.status(404)
                .json({message: 'Perhaps there is a problem with the database. Please refresh the page and try again :)'});
          return;
        }
        if (!users) {
            res.status(401).json(
                {message: 'Your access-token key is missing. Please try to log out and log in again. If you still have problems, please contact us. Best regards, Paradise Team.'})
           return;

        }

        var user = users[0] || null;
        req.user = user;
        next();
    });
}

module.exports = function (app) {
    console.log('------------AUTH');
    app.get('/', auth);

    app.get('/users', auth);

    // GET
    app.get('/groups/tasks', auth);
    app.get('/groups', auth);
    app.get('/groups/feed', auth);
    app.get('/groups/meetings', auth);
    app.get('/groups/tasks', auth);
    app.get('/groups/calendar', auth);

    // POST
    app.post('/groups/tasks', auth);
    app.post('/groups/add/member', auth);
    app.post('/groups/add/task', auth);
    app.post('/groups/meetings', auth);
    //'/users/add/group' ??
};