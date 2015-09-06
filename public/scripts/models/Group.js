import {joinRoom} from './../controllers/chatDataManager.js';
import toastr from './../../lib/toastr/toastr.js';



export default function addMember(member) {
  //  console.log('------------IN ADD MEMBER');
    // var member = $('#input-add-member').val();

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
        url: '/users/add/group',
        contentType: 'application/json',
        data: JSON.stringify(queryAddGroup),
        headers: {
            'x-authkey': JSON.parse(localStorage.getItem('access-token'))
        },
        success: function (data) {
          /*  console.log('GRPOUP ADDED');
            console.log(data);*/
        },
        error: function (err) {
            var message = JSON.parse(err.responseText).message || 'Something happend..';
            toastr.error(message);
        }
    });


    $.ajax({
        method: 'POST',
        url: '/groups/add/member',
        contentType: 'application/json',
        data: JSON.stringify(queryAddMember),
        headers: {
            'x-authkey': JSON.parse(localStorage.getItem('access-token'))
        },
        success: function (data) {
          //  console.log('MEMBER ADDED');
            // TODO: switch member with data.??
            joinRoom(member, data.name);
          //  console.log(data);
            toastr.success(member + ' successfuly added to group ' + data.name)
        },
        error: function (err) {
            var message = JSON.parse(err.responseText).message || 'Something happend..';
            toastr.error(message);
        }
    });


}//end add member

