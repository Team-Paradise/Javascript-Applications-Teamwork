var Group = require('mongoose').model('Group'),
    User = require('mongoose').model('User');

module.exports = {
    signup: function (req, res, next) {
        var newGroup = req.body;
        console.log(newGroup);
        Group.findOne({
            'name': newGroup.name
        }, function (err, user) {
            if (err) {
                console.log('Error searching in db: ' + err);
                res.sendStatus(404);
            } else if (user) {
                res.sendStatus(422);
            }
            else {

                Group.create({
                    name: newGroup.name,
                    members: []
                });
                res.json({name: newGroup.name, members: newGroup.members});
            }
        });
    },
    addMember: function (req, res, next) {
        var member;

        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                console.log('Cannot find testMember :' + err);
            }

            member = user;
        });

        Group.findOne({name: req.body.name}).populate('members').exec(function (err, group) {
            if (err) {
                console.log('ERROR ON POPULATING: ' + err);
                res.sendStatus(400); // TODO: check the real err code
            }
            console.log('POPULATE');
            group.members.push(member);
            group.save();
            console.log(group);
            res.json({name: group.name, members: group.members});
        });
    }
}
