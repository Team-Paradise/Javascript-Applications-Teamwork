//TODO: #! - for google
import 'lib/jquery/dist/jquery.js';
import {loginUser, logoutUser,toggleLoginPartials} from './controllers/loginController.js';
import switchControllers from './routes.js';

export function init() {
    var $loginBar = $('#loginBar');

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


    console.log('-----------HASH');
    var hash = JSON.parse(localStorage.getItem('route'));
   /* var path = hash.replace("#", "");
    switchControllers(path);*/


    $loginBar.load('partials/loginBar.html', function () {
        if (!localStorage.getItem('is-logged')) {
            loginUser();

            /* $('#sign-up-button').on('click', function () {
             $mainContainer.load('partials/sign-up-form.html');
             });*/
        } else {
            console.log('my username is taken from storage');
            var currentUsername = JSON.parse(localStorage.getItem('user'));
            toggleLoginPartials(currentUsername);
        }

        logoutUser();
    });

    $(window).bind('beforeunload', function () {
        var hash = JSON.stringify(location.hash);
        localStorage.setItem('route', hash);


    });

    $(window).on('hashchange', function (e) {
        console.log('hash change in window');
        var path = location.hash.replace("#", "");
        switchControllers(path);
    });
};
