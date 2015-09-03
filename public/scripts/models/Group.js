import {joinRoom} from './../controllers/chatDataManager.js';

export default function addMember() {
    console.log('------------IN ADD MEMBER');
   // var member = $('#input-add-member').val();
var member = 'solara';
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
}//end add member

