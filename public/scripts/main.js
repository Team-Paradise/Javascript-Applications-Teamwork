//TODO: #! - for google
$(function () {
    var loginManager = System.import('scripts/loginController.js')
        .then(function (loginModule) {
            console.log('imported!!!');
            loginModule.getLoginData();
        });

    var $mainContainer = $('#main-container'),
        $loginBar = $('#loginBar');

    var currentUser = {
        username: '',
        password: ''
    };
    //TODO: make div for this html which should change content on login
    $loginBar.load('partials/loginBar.html', function () {
        $('#loginSubmit').on('click', function () {
            currentUser.username = $('#username').val();
            currentUser.password = $('#pass').val();

            // DONE: post data for the user on server, check in db for the user
            // TODO: extract in module, set promises

            $.ajax({
                url: '/User',
                contentType: 'application/json',
                data: currentUser,
                success: function (data) {
                    // TODO: this should be plugged in the 'success' function in the POST ajax request
                    $('#loginForm').hide();
                    // TODO: think of handlebars
                    $('#user-profile-dropdown').text(currentUser.username);
                    $('#logged-user').show();
                },
                error: function (data) {
                    alert("You don't have account! Sorry peach :D");
                }
            });

            console.log(currentUser);
            return false;
        });

        $('#sign-up-button').on('click', function () {
            $mainContainer.load('partials/sign-up-form.html');
        });
    });

    // Changing html partials
    $(window).on('hashchange', function (e) {
        console.log('hash change in window');
        var path = location.hash.replace("#", "");
        showPage(path);
    });

    showPage = function (partial) {
        console.log('hello from show page');
        var url = 'partials/' + partial + '.html';
        console.log(url);
        $mainContainer.load(url, injectHtml);
    };

    // Controller for Chat, must be moved to another js module
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