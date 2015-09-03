var User = require('mongoose').model('User');
var userController = require('../controllers/usersController'),
    groupController = require('../controllers/groupController');

module.exports = function (app) {
    console.log('------------------------------ROUTES before require AUTH');
    require('./../utils/validation')(app);
    console.log('------------------------------ROUTES after require AUTH');
    app.get('/User', userController.login);

    app.get('/groups', groupController.getGenericInfo);
    app.get('/groups/feed', groupController.getFeed);
    app.get('/groups/meetings', groupController.getMeetings);
    app.get('/groups/tasks', groupController.getTasks);
    app.get('/groups/calendar', groupController.getCalendar);
    app.get('/users/groups', groupController.listGroups);
    app.post('/signup', userController.signup);

    // TODO: simple validation of fortmat of email. pass...
    // DONE: check if the user is already registred
    // DONE: if not -> send data to database and return success
    app.post('/groups/signup', groupController.signup);
    app.post('/groups/add/member', groupController.addMember);
    app.post('/groups/add/task', groupController.addTask);
    app.post('/groups/meetings', groupController.addMeeting);


    app.post('/users/add/group', function (req, res) {
        console.log(req.body);
        res.json(req.body);
    });

    /*app.post('/groups/messages', groupController.postMessages);
     app.get('/groups/messages', groupController.getMessages)
     */
};
