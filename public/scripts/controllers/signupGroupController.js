import {addRoom} from './../controllers/chatDataManager.js';
import {addMember} from './../models/Group.js';
import toastr from 'lib/toastr/toastr.js';

function signUp(data) {
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: '/groups/signup',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'x-authkey': JSON.parse(localStorage.getItem('access-token'))
            },
            success: function (data) {
                localStorage.setItem('current-group', JSON.stringify(data.name));
                addRoom(data.name);
              //  console.log(data);
                resolve(data);
            },
            error: function (data) {
                reject(data);
              //  console.log(data);
            }
        });
    });


    return promise;
}
export default function signupGroupController() {

    var $groupContainer = $('#group-container');
    $groupContainer.html('');
    var btnSumbit = $('#group-signup-submit');
    var newGroup;
    btnSumbit.on('click', function () {
      //  console.log('CLICK');
        newGroup = {
            name: $('#input-group-name').val(),
            password: $('#input-group-password').val(),
            description: $('#input-group-desc').val(),
            git: $('#input-git-link').val()
        };


        signUp(newGroup).then(function (data, err) {
            if (err) {
              //  console.log(err);
            }
            var creator = JSON.parse(localStorage.getItem('user'));
            addMember(creator);
            // TODO: when redirect should do it after addGroupMember -> move it in promise
            location.hash = "#home";
        }, function(err){
          //  console.log(err);
            var message = JSON.parse(err.responseText).message || 'Something happend..';
            toastr.error(message);
        });


    });
};
