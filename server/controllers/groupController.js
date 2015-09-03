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
        var member, newGroup;

        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                console.log('Cannot find testMember :' + err);
            }

            member = user;
        });

        Group.findOne({name: req.body.name}).populate('members').exec(function (err, group) {
            console.log('-----------ADD MEMBER:');
            console.log(member);
            console.log(group);
            console.log('--------------');
            if (err) {
                console.log('ERROR ON POPULATING: ' + err);
                res.sendStatus(400); // TODO: check the real err code
            }

            group.members.push(member);
            group.save();

            member.groups.push(group);
            member.save();

            res.json({name: group.name, members: group.members});

        });

    },

    addTask: function (req, res, next) {
        Group.findOne({name: req.body.name}, function (err, info) {
                if (err) return res.send("contact create error: " + err);

                // add the task to the group todos
                Group.findByIdAndUpdate(
                    info._id,
                    {$push: {"tasks": req.body.task}},
                    {safe: true, upsert: true},
                    function (err, model) {
                        if (err) {
                            console.log('Error on updating tasks : ' + err);
                            res.sendStatus(400);
                        }
                        res.json({name: model.name, tasks: model.tasks})
                        console.log(model);
                    }
                );
            }
        )
        ;
    },

    getTasks: function (req, res, next) {
        Group.findOne({name: req.query.name}, function (err, data) {
            console.log(req.query.name);
            console.log(data);
            if (err) {
                res.sendStatus(400);
            }
            console.log(data);
            console.log('null??');
            res.json({tasks: data.tasks});
        })
    },

    /*getMessages: function (req, res, next) {
     // group, sender, msg
     Group.findOne({name: req.query.name}, function (err, group) {
     if (err) {
     res.sendStatus(400);
     }

     res.json({messages: group.messages});
     })
     },

     postMessages: function (req, res, next) {
     console.log(req.body);
     Group.findOne({name: req.body.name}, function (err, group) {
     if (err) {
     res.sendStatus(400);
     }
     console.log(req.body);

     Group.findByIdAndUpdate(
     group._id,
     {$push: {"messages": req.body}}, // sender & msg
     {safe: true, upsert: true},
     function (err, group) {
     if (err) {
     console.log('Error on updating tasks : ' + err);
     res.sendStatus(400);
     }
     res.json({sender: group.messages.sender, mag: group.messages.msg});
     console.log(group);
     }
     );
     });
     },*/

    listGroups: function (req, res, next) {
        console.log('---------LIST GROUPS');
        console.log(req.query.user);

        User.findOne({
            'username': req.query.user
        }, function (err, user) {
            if (err) {
                res.sendStatus(400);
            } else if (user) {
                var groupIDs = user.groups;


                Group.find({
                    '_id': {$in: groupIDs}
                }, function (err, groups) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(404);
                    }
                    console.log(groups);
                    console.log('--------BEFORE RES');
                    res.json({info: groups});
                });

            } else {
                res.sendStatus(404);
            }
        });
    },
    getFeed: function (req, res, next) {

    },

    addMeeting: function (req, res, next) {
        //req.body
        var newMeeting = {
            date: req.body.date,
            about: req.body.about
        };

        Group.findOne({name: req.body.group}).populate('meetings').exec(function (err, group) {
            if (err) {

                res.sendStatus(404);
            }
            group.meetings.push(newMeeting);
            group.save();

            res.json({meeting: newMeeting});
        })

    },

    getMeetings: function (req, res, next) {

    },
    getCalendar: function (req, res, next) {

    },
    getGenericInfo: function (req, res, next) {

    }
}
