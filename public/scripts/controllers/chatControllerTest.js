import io from 'socket.io/socket.io.js';

export default function chatController() {
    var $messageField = $("#message"),
        $chat = $("#chat"),
        $submitBtn = $("#submitBtn");

    $submitBtn.on('click', function (ev) {

        ev.preventDefault();
        if ($messageField.val()) {
            // save to database

            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    method: 'POST',
                    url: '/groups/messages',
                    contentType: 'application/json',
                    data: JSON.stringify({name: 'Paradise', sender: 'Az', msg: $messageField.val()}),
                    success: function (data) {
                        console.log(data);
                        resolve(data.username);
                    },
                    error: function (data) {
                        console.log('Error posting msg: ' + data);
                    }
                })
            })

            return promise;


        }

    }).then(function (success, error) {
        if(false){
            setInterval(feedChat, 40000);
        }

    });


    //set time out
    function feedChat() {
        $.ajax({
            url: '/groups/messages',
            contentType: 'application/json',
            data: JSON.stringify({name: 'Paradise', sender: 'Az', msg: $messageField.val()}),
            success: function (data) {

                $(document.createTextNode(data.sender)).appendTo($chat);
                $(document.createTextNode(data.msg)).appendTo($chat);

                $chat.append('</br>');
            },
            error: function (data) {

            }
        })
    }

    $("#message").keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $submitBtn.click();
        }
    });


}/**
 * Created by Solara on 02/09/2015.
 */
