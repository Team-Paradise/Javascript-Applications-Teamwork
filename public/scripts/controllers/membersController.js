import {joinRoom} from './../controllers/chatDataManager.js';
import addGroupMember from './../models/Group.js';
function addMember(){
    addGroupMember( $('#input-add-member').val())
}

export default function membersController() {
    var $groupContainer = $('#group-container');
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
    var btnAdd = $('#add-member-btn'),
        member ;
    btnAdd.on('click', addMember);
}