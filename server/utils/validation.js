var mongoose = require('mongoose'),
    User = require('mongoose').model('User');


module.exports = {
    validateUser: function (username, password) {
        User.findOne({ username: password}, function (err, doc){
           if(err){
               return false;
           } else{
               return true;
           }

        });
    }
}
