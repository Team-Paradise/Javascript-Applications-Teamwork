var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
require('./User');
var groupSchema = new Schema({
    name: {type: String},
    password: {type: String},
    description: {type: String},
    git: {type: String},
    tasks: {type: [String]}, // think of type
    //events: {type: [String]}, // think of type
    //meetings: {type: [String]}, // think of type
    messages: [
        {
            sender: {type: String, required: true},
            msg: {type: String, required: true}
        }],
    members: [{type: ObjectId, ref: 'User'}]
});


var Group = mongoose.model('Group', groupSchema, 'groups');

var testMember;
User.findOne({
    username: 'krasi'
}, function (err, user) {
    if (err) {
        console.log('Cannot find testMember :' + err);
    }

    testMember = user;
});

module.exports.createInitialGroups = function () {
    console.log('creating group..');

    Group.find({}).exec(function (err, groups) { //name: 'paradise'
        if (err) {
            console.log('Error with searchinf in Groups table: ' + err);
        }
        /* console.log("GROUPS");
         console.log(groups);
         console.log('------');*/
        // TODO: create on event -> move to ctrl
        /*  if (true) {
         Group.create({name: 'paradise', members: testMember}).then(function (group) {
         console.log('group created:');
         console.log(group.members);
         });

         }*/
    });

    // TODO: add member -> move to ctrl
    Group.findOne({name: 'paradise'}).populate('members').exec(function (err, group) {
        if (err) {
            console.log('ERROR ON POPULATING: ' + err);
        }
        console.log('POPULATE');
        group.members.push(testMember);
        group.save();
        console.log(group);
    });

};