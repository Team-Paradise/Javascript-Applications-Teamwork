$(function () {
    var $mainContainer = $('#main-container'),
        $navChat = $('#nav-chat');
   // $mainContainer.html($mainContainer.load('../partials/chat.html'));
    $navChat.on('click',function(e){
        console.log('in event');
       // e.preventDefault();
        $mainContainer.html($mainContainer.load('../partials/chat.html'));
    });

    console.log('hello');
    var socket = io(),
        $messageForm= $("#send-message"),
        $messageField = $("#message"),
        $chatB = $("#chat");
console.log($messageForm);
    $messageForm.submit(function(ev){
        console.log('submit');
        ev.preventDefault();
        socket.emit('sent-message', $messageField.val());
        $messageField.val('');
    });

    socket.on('new-message', function(msg) {
        $chatB.append(msg + "<br/>");
    })

});