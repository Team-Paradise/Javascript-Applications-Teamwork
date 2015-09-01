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
    },
    /*addTask: function(req, res, next){
     Group.findOne({name: req.body.name}).populate('tasks').exec(function(err, group){
     if(err){
     console.log('Error on server saving task, no such group found: ' + err);
     res.sendStatus(400);
     }
     console.log('REQUEST:');
     console.log(req.body);
     console.log(req.body.todo);
     console.log(req.query);
     console.log('--end request---');
     group.tasks.push(req.body.task);
     group.save();
     console.log(group);
     res.json({name: group.name, tasks: group.tasks});
     });
     }*/
    addTask: function (req, res, next) {
        Group.findOne({name: req.body.name}, function (err, info) {
                if (err) return res.send("contact create error: " + err);

                // add the task to the group todos
                Group.findByIdAndUpdate(
                    info._id,
                    {$push: {"tasks": req.body.task}},
                    {safe: true, upsert: true},
                    function(err, model) {
                        if(err){
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
    getTasks: function(req,res,next){
        Group.findOne({name:req.query.name}, function(err,data){
            console.log(req.query.name);
            console.log(data);
            if(err){
                res.sendStatus(400);
            }
            console.log(data);
            console.log('null??');
            res.json({tasks: data.tasks});
        })
    },
    getFeed: function(req, res, next){

    },
    getMeetings: function(req, res, next){

    },
    getCalendar: function(req, res, next){

    },
    getGenericInfo: function(req, res, next){

    }
}
