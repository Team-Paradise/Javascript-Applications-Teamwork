import io from 'socket.io/socket.io.js';
import {addClient, addRoom, joinRoom, socket} from './../controllers/chatDataManager.js';
import {addMessage} from './../models/Group.js';

export default function chatController() {
    /* var socket = io(),*/
    var $messageField = $("#message"),
        $chatBox = $("#new-messages"),
        $submitBtn = $("#submitBtn");


    $chatBox.html('');
    $("#message-box").animate({scrollTop: $(document).height()}, "slow");

    addClient(JSON.parse(localStorage.getItem('user')));
    addRoom(JSON.parse(localStorage.getItem('current-group')));
    joinRoom(JSON.parse(localStorage.getItem('user')), JSON.parse(localStorage.getItem('current-group')));

    $submitBtn.on('click', function (ev) {
        ev.preventDefault();
        var msg = $messageField.val();
        if (msg) {
            socket.emit('sent-message', msg);
            $messageField.val('');
            addMessage({sender: JSON.parse(localStorage.getItem('user')), msg: msg, group: JSON.parse(localStorage.getItem('current-group'))});
        }
    });

    $("#message").keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $submitBtn.click();
        }
    });

    socket.on('new-message', function (data, msg) {
        var li = $('<li/>')
                .addClass('list-group-item')
                .addClass('well'),
            uiSender = $("<div/>")
                .addClass('list-group-item-heading text-info')
                .addClass('text-info')
                .text(data),
            uiMsg = $("<div/>")
                .addClass('list-group-item-text')
                .addClass('text-muted')
                .text(msg);
        li.append(uiSender).append(uiMsg).appendTo($chatBox);
        // <div class="list-group-item-heading text-info">{{this.sender}} </div>
        // <div class="list-group-item-text text-muted"><i>{{this.msg}}</i></div>

        //return false;
        console.log(socket);
        $chatBox.append(li);
        // TODO: think when to save the message? on sent or on new-message. First is maybe better if the msg is lost

    });
}
