import 'lib/jquery/dist/jquery.js';
import toastr from 'lib/toastr/toastr.js';

export default function getLoginData() {
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
                url: '/User',
                contentType: 'application/json',
                data: currentUser,
                success: function (data) {
                    console.log(data);
                    $('#loginForm').hide();
                    // TODO: think of handlebars
                    $('#user-profile-dropdown').text(data.username);
                    $('#logged-user').show();
					
					localStorage.setItem('isUserLogged', true);	//when we set button 'logout' on its click this will be set to 'false';
					localStorage.setItem('user', JSON.stringify(data.username));
                },
                error: function (data) {

                    toastr.options = {"positionClass": "toast-top-right"};
                    toastr.error('Username or password are not valid!');
                }
            });

            return false;
        });
};