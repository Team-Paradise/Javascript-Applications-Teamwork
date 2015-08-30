//TODO: #! - for google
$(function () {
    var $mainContainer = $('#main-container'),
        $groupContainer = $('#group-container'),
        $loginBar = $('#loginBar');

    var currentUser = {
        username: '',
        password: ''
    };

    /* Some usefull options for toastr:
     toastr.options = {
     "closeButton": false,
     "debug": false,
     "newestOnTop": false,
     "progressBar": false,
     "positionClass": "toast-top-center",
     "preventDuplicates": false,
     "onclick": null,
     "showDuration": "300",
     "hideDuration": "1000",
     "timeOut": "5000",
     "extendedTimeOut": "1000",
     "showEasing": "swing",
     "hideEasing": "linear",
     "showMethod": "fadeIn",
     "hideMethod": "fadeOut"
     };*/
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
                    console.log(data);
                    // TODO: this should be plugged in the 'success' function in the POST ajax request
                    $('#loginForm').hide();
                    // TODO: think of handlebars
                    $('#user-profile-dropdown').text(data.username);
                    $('#logged-user').show();
                },
                error: function (data) {

                    toastr.options = {"positionClass": "toast-top-right"};
                    toastr.error('Username or password are not valid!');
                }
            });

            return false;
        });

        /*  $('#sign-up-button').on('click', function () {
         $mainContainer.load('partials/sign-up-form.html');
         });*/
    });
//-------------------------- move to modules -----------------------------------------
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
        console.log(partial);
        var action = getActionOnHashChange(partial);
        console.log(action);
        if (action) {
            action.container.load(url, action.controller);
        }
    };

    getActionOnHashChange = function (partialName) {

        switch (partialName) {
            case 'home':
                return {container: $mainContainer, controller: homeController};
            case 'sign-up-form':
                return {container: $mainContainer, controller: signupController};
            case 'group-nav':
                return {container: $mainContainer, controller: groupNavController};
            case 'feed':
                return {container: $groupContainer, controller: feedController};
            case 'meetings':
                return {container: $groupContainer, controller:meetingsController};
            case 'todo-list':
                return {container: $groupContainer, controller:todoController};
            case 'chat':
                return {container: $groupContainer, controller:chatController};
            case 'calendar':
                return {container: $groupContainer, controller:calendarController};


            default:
                return false;
                break;
        }

    };


    // CONTROLLERS
    var homeController = function () {
        console.log('home page loaded');
    };
    var feedController = function () {
        console.log('feed page loaded');
    };
    var meetingsController = function () {
        console.log('meetings page loaded');
    };
    var todoController = function () {
        console.log('todo page loaded');
    };
    var calendarController = function () {
        console.log('calendar page loaded');
    };

    var groupNavController = function () {
        console.log('group navigation loaded');
    };

    var signupController = function () {
        console.log('Hello from SIGN UP controller');
        var $signUpSubmit = $('#signUpSubmit');

        $signUpSubmit.on('click', function () {
            var $username = $('#inputUsername').val(),
                $email = $('#inputEmail').val(),
                $password = $('#inputPassword').val();

            var newUser = {
                username: $username,
                email: $email,
                password: $password
            };

            $.ajax({
                method: 'POST',
                url: '/signup',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function (data) {
                    console.log('POST success! ');
                    console.log(data);
                    console.log('-----');
                },
                error: function (data) {
                    switch (data.status) {
                        case 422:
                            toastr.options = {"positionClass": "toast-top-center"};
                            toastr.error('User with this username already exist! Please choose another one.');
                            break;
                        case 404:
                            toastr.error('Sadly.. something happand with the database..');
                            break;
                        case '422':
                            console.log('string');
                            break;
                        default:
                            break;
                    }

                }
            });

            return false;
        })

    };


// Controller for Chat, must be moved to another js module
    var chatController = function () {
        var socket = io(),
            $messageField = $("#message"),
            $chat = $("#chat"),
            $submitBtn = $("#submitBtn");

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
                $("#submitBtn").click();
                return false;
            }
        });

        socket.on('new-message', function (msg) {
            $chat.append(msg + "<br/>");
        });
    };
});
