import {addRoom} from './../controllers/chatDataManager.js';
import addGroupMember from './../models/Group.js';

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
                addRoom(data.name);
                console.log(data);
                resolve(data);
            },
            error: function (data) {
                reject(data);
                console.log(data);
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
        console.log('CLICK');
        newGroup = {
            name: $('#input-group-name').val(),
            password: $('#input-group-password').val(),
            description: $('#input-group-desc').val(),
            git: $('#input-git-link').val()
        };
        localStorage.setItem('current-group', JSON.stringify(newGroup.name));
        signUp(newGroup).then(function (data, err) {
            if (err) {
                console.log(err);
            }
            var creator = JSON.parse(localStorage.getItem('user'));
            addGroupMember(creator);
            // TODO: when redirect should do it after addGroupMember -> move it in promise
            location.hash = "#home";
        });


    });
};
