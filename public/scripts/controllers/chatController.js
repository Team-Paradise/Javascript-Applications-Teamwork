import io from 'socket.io/socket.io.js';
import {addClient, addRoom, joinRoom, socket} from './../controllers/chatDataManager.js';
export default function chatController() {
    /* var socket = io(),*/
    var $messageField = $("#message"),
        $chat = $("#chat"),
        $submitBtn = $("#submitBtn");
    addClient(JSON.parse(localStorage.getItem('user')));
    addRoom(JSON.parse(localStorage.getItem('current-group')));
    joinRoom(JSON.parse(localStorage.getItem('user')),JSON.parse(localStorage.getItem('current-group')));
    // socket.emit('');

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
