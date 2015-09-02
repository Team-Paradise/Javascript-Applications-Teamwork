import {addRoom} from './../controllers/chatDataManager.js';
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
localStorage.setItem('current-group',JSON.stringify(newGroup.name));
        $.ajax({
            method: "POST",
            url: '/groups/signup',
            contentType: 'application/json',
            data: JSON.stringify(newGroup),
            success: function (data) {
                addRoom(data.name);
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
};
