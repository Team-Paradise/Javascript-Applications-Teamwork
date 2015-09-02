import {joinRoom} from './../controllers/chatDataManager.js';

export default function testController() {
    var $groupContainer = $('#group-container');
    $groupContainer.html('');
    //CREATE GROUP
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

        $.ajax({
            method: "POST",
            url: '/groups/signup',
            contentType: 'application/json',
            data: JSON.stringify(newGroup),
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
    // ADD MEMBER TO PREV REGISTRED GROUP
    var btnAdd = $('#add-member-btn');
    btnAdd.on('click', function () {
        var member = $('#input-add-member').val();

        var queryAddMember = {
            name: JSON.parse(localStorage.getItem('current-group')),
            username: member
        };
        var queryAddGroup = {
            username: member,
            group: JSON.parse(localStorage.getItem('current-group'))
        };
        $.ajax({
            method: 'POST',
            url: '/groups/add/member',
            contentType: 'application/json',
            data: JSON.stringify(queryAddMember),
            success: function (data) {
                console.log('MEMBER ADDED');
                // TODO: switch member with data.??
                joinRoom(member, data.name);
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });

        $.ajax({
            method: 'POST',
            url: '/users/add/group',
            contentType: 'application/json',
            data: JSON.stringify(queryAddGroup),
            success: function (data) {
                console.log('GRPOUP ADDED');
                console.log(data);
            },
            error: function (data) {
                console.log('Error on adding the user as group member');
                console.log(data);
            }
        });
    });//end btn onclick
}