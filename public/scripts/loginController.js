import '../lib/jquery-2.0.2.js';
//import '../lib/toastr/toastr.js';

//TODO: config System.js
function getLoginData(){
    /*console.log('Heyyy');
    var $loginForm = $('#loginForm');
    $('#loginSubmit').on('click', function (){
        currentUser.username = $('#username').val();
        currentUser.password = $('#pass').val();
        // post data for the user on server, check in db for the user
        
        console.log(currentUser);
        return false;
    });*/
	var currentUser = {
        username: '',
        password: ''
    };
	
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

                    //toastr.options = {"positionClass": "toast-top-right"};
                    //toastr.error('Username or password are not valid!');
                }
            });

            return false;
        });
}

export { getLoginData }
export default { getLoginData }