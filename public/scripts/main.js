//TODO: #! - for google
import 'lib/jquery/dist/jquery.js';
import {loginUser, logoutUser,toggleLoginPartials} from './controllers/loginController.js';
import switchControllers from './routes.js';
import {joinRoom, leaveRoom} from './controllers/chatDataManager.js';

export function init() {
    var $loginBar = $('#loginBar');
    $("body").animate({scrollTop: 0}, "fast");

    document.location.hash = "#/";
    document.location.hash = "#home";

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


    //  console.log('-----------HASH');
    var hash = JSON.parse(localStorage.getItem('route'));
    /* var path = hash.replace("#", "");
     switchControllers(path);*/


    $loginBar.load('partials/loginBar.html', function () {
        if (!localStorage.getItem('is-logged')) {
        } else {
            //  console.log('my username is taken from storage');
            var currentUsername = JSON.parse(localStorage.getItem('user'));

            toggleLoginPartials(currentUsername);
        }
        loginUser();
        logoutUser();
    });

    $(window).bind('beforeunload', function () {
        var hash = JSON.stringify(location.hash);
        localStorage.setItem('route', hash);


    });

    $(window).on('hashchange', function (e) {
        //  console.log('hash change in window');
        var path = location.hash.replace("#", "");
        switchControllers(path);
    });


    // If the user login / logout from one tab it will reflect on all tabs
    window.addEventListener('storage', function (event) {
        if (event.key === "access-token" || event.key === null) {
            window.location.reload();
        }
        if (event.key === "current-group") {
            var user = JSON.parse(localStorage.getItem('user'));
            joinRoom(user, event.newValue);
            leaveRoom(user, event.oldValue);
        }
        // if current-group -> socket.leave oldValue, join newValue, if null handle (can it be nul, when the key is not nell?)
        // think of leaving when tha key is null...
        // chek if the room already exist, there are 100 groups Paradise..
        // save rooms as groups.. anddd posts as messages..
        // in chatController show the history for the group
        // parse with Handlebars each data ---> this.sender, this.message
    });
};
