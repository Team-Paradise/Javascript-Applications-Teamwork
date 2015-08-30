//TODO: #! - for google

//import '../../node_modules/socket.io/socket.io.js';
//import '../lib/jquery-2.0.2.js';
import 'lib/jquery/dist/jquery.js';
import loginController from './loginController.js';
import routeController from './routes.js';
import toastr from '../lib/toastr/toastr.js';
/*export function routes() {
	routeController.switchControllers();
}*/


function init() {
    var $mainContainer = $('#main-container'),
        $groupContainer = $('#group-container'),
		$loginBar = $('#loginBar');
		
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
	 
    var currentUser = {
        username: '',
        password: ''
    };
    //TODO: make div for this html which should change content on login
    $loginBar.load('partials/loginBar.html', function () {
		loginController.getLoginData();
        
         /* $('#sign-up-button').on('click', function () {
         $mainContainer.load('partials/sign-up-form.html');
         });*/
    });
//-------------------------- move to modules -----------------------------------------
    // Changing html partials
	
	$(window).on('hashchange', function (e) {
        console.log('hash change in window');
        var path = location.hash.replace("#", "");
		console.log('path- ' + path);
		routeController.switchControllers(path);
    });

}

export {init};
