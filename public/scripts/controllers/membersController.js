import {joinRoom} from './../controllers/chatDataManager.js';
import {addMember} from './../models/Group.js';


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
            headers: {
                'x-authkey': JSON.parse(localStorage.getItem('access-token'))
            },
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