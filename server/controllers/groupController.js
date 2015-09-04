var Group = require('mongoose').model('Group'),
    User = require('mongoose').model('User');

module.exports = {
    signup: function (req, res, next) {
        var newGroup = req.body;
        if (!newGroup.name) {
            res.status(400).json({message: 'Please enter username!'});
            return next();
        }
        // console.log(newGroup);
        Group.findOne({
            'name': newGroup.name
        }, function (err, user) {
            if (err) {
                // console.log('Error searching in db: ' + err);
                res.status(404);
                return next();
            } else if (user) {
                res.status(422).json({message: 'Group with this name already exist!'});
                return next();
            }
            else {
                Group.create({
                    name: newGroup.name,
                    members: [],
                    tasks: [],
                    meetings: []
                });
                res.json({name: newGroup.name, members: newGroup.members});
            }
        });
    },

    addMember: function (req, res, next) {
        var member, newGroup;
        if (!req.body.name) {
            res.status(400).json({message: 'Please select group from the dropdowan menu!'});
            return next();
        }
        if (!req.body.username) {
            res.status(400).json({
                message: 'User with this username is not registred. You can add to the group only registred users.'
            });
            return next();
        }
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                res.status(404).json({message: 'Error on database'});
                return next();
            } else if (!user) {
                res.status(404).json({message: 'User with this username was not found'});
                return next();
            } else {
                member = user;
            }
        });
// tODO: exec?
        Group.findOne({name: req.body.name}).populate('members').exec(function (err, group) {
            console.log('-----------ADD MEMBER:');
            console.log(member);
            console.log(group);
            console.log('--------------');
            if (err) {

                res.status(400); // TODO: check the real err code
            } else if (!group) {
                res.status(404)
                    .json({message: 'Select group to add member. You can select a group from the dropdown menu "Groups""'});
                return next();
            } else if (member && ( member.groups || Array.isArray(member.groups))) {
                group.members.push(member);
                group.save();
                member.groups.push(group);
                member.save();
                res.json({name: group.name, members: group.members});
            }
        });

    },

    addTask: function (req, res, next) {
        if (!req.body.name) {
            res.status(400)
                .json({message: 'Please select group from the dropdown menu to which you want to add the task!'})
            return next();
        }
        Group.findOne({name: req.body.name}, function (err, info) {
            if (err) return res.send("contact create error: " + err);

            // add the task to the group todos
            Group.findByIdAndUpdate(
                info._id,
                {$push: {"tasks": req.body.task}},
                {safe: true, upsert: true},
                function (err, model) {
                    if (err) {

                        res.status(400);
                    }
                    res.json({name: model.name, tasks: model.tasks});
                    console.log(model);
                }
            );
        });
    },

    removeTask: function (req, res, next) {
        if (!req.query.name) {
            res.status(400)
                .json({message: 'Please select group from the dropdown menu !'})
            return next();
        }
        Group.findOne({name: req.query.name}, function (err, info) {
            if (err) return res.send("contact create error: " + err);
            info.tasks.pull(req.query.taks);
            // add the task to the group todos
            /*Group.findByIdAndUpdate(
             info._id,
             {$pull: {"tasks": req.query.task}},
             false,
             true,
             function (err, model) {
             if (err) {

             res.status(400);
             }

             res.json({name: model.name, tasks: model.tasks});
             console.log(model);
             }
             );*/
        });
    },

    getTasks: function (req, res, next) {
        if (!req || !req.query || !req.query.name) {
            res.status(400)
                .json({message: 'Please select group from the dropdown menu !'});
            return next();
        }
        Group.findOne({name: req.query.name}, function (err, data) {

            if (err) {
                res.status(400);
                next();
            }
            if (!data && !Array.isArray(data)) {
                res.status(404);//.json('Please, select group!');
                next();
            } else {

                res.json({tasks: data.tasks});
            }

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
        console.log(req.query);
        if (!req.query || !req.query.user) {
            res.status(400).json({message: 'Please login'});
            return next();
        }


        User.findOne({
            'username': req.query.user
        }, function (err, user) {
            if (err) {
                res.status(401).json({message: 'Error searching user..'});
                return next(err);
            }
            if (!user) {
                res.status(404).json({message: 'User is not registred!'});
                return next();
            } else if (user) {
                var groupIDs = user.groups;

                Group.find({
                    '_id': {$in: groupIDs}
                }, function (err, groups) {
                    if (err) {

                        res.status(404);
                    } else {
                        res.json({info: groups});
                    }
                });

            } else {
                res.status(404)
                    .json({message: 'Sorry! We have some problems. Please refresh the page and try again!'});
                return next();
            }
        });
    },

    getFeed: function (req, res, next) {

    },

    addMeeting: function (req, res, next) {
        //req.body
        if (!req.body.date || !req.body.about) {
            res.status(400)
                .json({message: 'Please enter date and info about the meeting!'});
            return next();
        }
        if (!req.body.group) {
            res.status(400)
                .json({message: 'Plaese, select a group from the dropdown menu!'});
            return next();
        }
        var newMeeting = {
            date: req.body.date,
            about: req.body.about
        };

        Group.findOne({name: req.body.group}).populate('meetings').exec(function (err, group) {
            if (err) {
                res.status(404);
            }
            group.meetings.push(newMeeting);
            group.save();

            res.json({meeting: newMeeting});
        })

    },

    getMeetings: function (req, res, next) {
        if (!req.query.name) {
            res.status(400).json({massage: 'Please, select a group from the dropdown menu!'});
        }
        Group.findOne({name: req.query.name}, function (err, data) {

            if (err) {
                res.status(400).json({meeting: ''});
            }

            res.json({meetings: data.meetings});
        })
    },

    getCalendar: function (req, res, next) {

    },
    getGenericInfo: function (req, res, next) {

    }
}
