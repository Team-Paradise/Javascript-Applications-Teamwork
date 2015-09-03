import 'lib/jquery/dist/jquery.js';
import 'lib/bootstrap/js/dropdown.js';
import toastr from 'lib/toastr/toastr.js';
import homeController from './../controllers/homeController.js';

function loginUser() {
	var currentUser = {
        username: '',
        password: ''
    };
    
    $('#loginSubmit').on('click', function () {
        currentUser.username = $('#username').val();
        currentUser.password = $('#pass').val();

        // DONE: post data for the user on server, check in db for the user
        // TODO: set promises

        $.ajax({
            url: 'User',
            contentType: 'application/json',
            data: currentUser,
            success: function (data) {
                console.log(data);
                toggleLoginPartials(data.username);
                localStorage.setItem('isUserLogged', true);
                localStorage.setItem('user', JSON.stringify(data.username));
                //TODO: can be done with method redirect..
                homeController();  // move to promise
            },
            error: function (data) {

                toastr.options = {"positionClass": "toast-top-right"};
                toastr.error('Username or password are not valid!');
            }
        });

        return false;
    });	
}

function logoutUser() {
    $('#logout-button').on('click', function () {
        toggleLoginPartials();
        localStorage.clear();
        homeController();
    });
}

function toggleLoginPartials(data) {
    $('#loginForm').toggle();
    // TODO: think of handlebars
    $('#user-profile-dropdown').text(data);
    $('#logged-user').toggle();
}

export {loginUser, logoutUser, toggleLoginPartials}