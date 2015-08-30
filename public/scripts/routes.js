import 'lib/jquery/dist/jquery.js';
import homeController from './homeController.js';
import feedController from './feedController.js';
import meetingsController from './meetingsController.js';
import signupController from './signupController.js';
import todoController from './todoController.js';
import calendarController from './calendarController.js';
import groupNavController from './groupNavController.js';
import chatController from './chatController.js';
//import testController from './testController.js';

function switchControllers(partial) {
	var $mainContainer = $('#main-container'),
        $groupContainer = $('#group-container');
		
    function getActionOnHashChange(partialName) {
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
				//DEBUG:
			/*case 'test':
				return {container: $mainContainer, controller: testController};*/
            default:
                return {container: $mainContainer, controller: homeController};
                break;
		}
    }
	
	return function() {
        console.log('hello from show page');
        var url = 'partials/' + partial + '.html';
        var action = getActionOnHashChange(partial);
        if (action) {
            action.container.load(url, action.controller);
        }
    }();
}

export default {switchControllers};