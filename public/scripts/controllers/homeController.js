import toastr from 'lib/toastr/toastr.js';


export default function homeController() {

    var $groupContainer = $('#group-container'),
        $mainContainer = $('#main-container'),
        $jumbotronButton = $('#jumbotron-join-button');

    $groupContainer.html('');

    if (!!localStorage.getItem('user')) {
        $jumbotronButton.on('click', function () {
            // TODO: think what if I want to register more than one profile?
            // TODO: fix bug: when you register a user you are not login so you cant lgout -> you cant registwe new profile
            toastr.options = {"positionClass": "toast-top-center"};
            toastr.error('You are already registered.');
            $jumbotronButton.removeAttr('href');

        });

        $('#jumbotron-join-button').css("display", "none");
        $('#jumbotron-signup-group-button').css("display", "block");
    } else {
        // TODO: call login from Controller, first talk with Zlatko
        $('#jumbotron-signup-group-button').css("display", "none");
        $('#jumbotron-join-button').css("display", "");
    }
}