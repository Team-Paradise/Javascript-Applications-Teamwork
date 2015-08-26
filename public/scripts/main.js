$(function () {
    var $mainContainer = $('#main-container'),
        $navChat = $('#nav-chat');
    // $mainContainer.html($mainContainer.load('../partials/chat.html'));
    $navChat.on('click', function (e) {
        console.log('in event');
        // e.preventDefault();
        console.log($mainContainer);
        $mainContainer.load('partials/chat.html', null, injectHtml);

    });

    var injectHtml = function () {

        var socket = io(),
            $messageField = $("#message"),
            $chatB = $("#chat"),
            $submitBtn = $("#submitBtn");

        $submitBtn.on('click', function (ev) {
            ev.preventDefault();
            socket.emit('sent-message', $messageField.val());
            $messageField.val('');
        });

        socket.on('new-message', function (msg) {
            $chatB.append(msg + "<br/>");
        });
    }

});