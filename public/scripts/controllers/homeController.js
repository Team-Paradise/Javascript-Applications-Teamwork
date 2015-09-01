import toastr from 'lib/toastr/toastr.js';

export default function homeController() {

    var $groupContainer = $('#group-container'),
	$mainContainer = $('#main-container'),
    $jumbotronButton = $('#jumbotron-join-button');
	
    $groupContainer.html('');
	
	if (!!localStorage.getItem('user')) {
        $jumbotronButton.on('click', function(){
            toastr.options = {"positionClass": "toast-top-center"};
            toastr.error('You are already registered.');
            $jumbotronButton.removeAttr('href');
        });
	}
	
    console.log('home page loaded');
}