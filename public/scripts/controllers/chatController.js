import io from 'socket.io/socket.io.js';
import {addClient, addRoom, joinRoom, socket} from './../controllers/chatDataManager.js';
export default function chatController() {
    /* var socket = io(),*/
    var $messageField = $("#message"),
        $chat = $("#chat"),
        $submitBtn = $("#submitBtn");
   /* addClient(globalCurrentUser);
    addRoom(globalCurrentGroup);
    joinRoom(globalCurrentUser, globalCurrentGroup);*/
    // socket.emit('');
    console.log('SOCKETS');
    console.log(socket);
    console.log(socket.username);
    console.log(socket.room);
    console.log('---------');
    $submitBtn.on('click', function (ev) {
        ev.preventDefault();
        if ($messageField.val()) {
            socket.emit('sent-message', $messageField.val());
            $messageField.val('');
        }
    });

    $("#message").keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $submitBtn.click();
        }
    });

    socket.on('new-message', function (data, msg) {


        $chat.append('<b>' + data + ': </b>' + msg + '<br>');


    });
}
