var User = require('mongoose').model('User');
var userController = require('../controllers/usersController');
module.exports = function (app) {

    app.get('/User', userController.login);

    app.post('/signup', userController.signup);

        // TODO: simple validation of fortmat of email. pass...
        // DONE: check if the user is already registred
        // DONE: if not -> send data to database and return success


};
