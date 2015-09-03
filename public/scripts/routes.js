import 'lib/jquery/dist/jquery.js';
import handlebars from 'lib/handlebars/handlebars.js';
import homeController from './controllers/homeController.js';
import feedController from './controllers/feedController.js';
import meetingsController from './controllers/meetingsController.js';
import signupController from './controllers/signupController.js';
import signupGroupController from './controllers/signupGroupController.js';
import todoController from './controllers/todoController.js';
import calendarController from './controllers/calendarController.js';
import groupNavController from './controllers/groupNavController.js';
import chatController from './controllers/chatController.js';
import membersController from './controllers/membersController.js';
import toastr from 'lib/toastr/toastr.js';





export default function switchControllers(partial) {
    var $mainContainer = $('#main-container'),
        $groupContainer = $('#group-container');

    var getActionOnHashChange = function (partialName) {
        var promise = new Promise(function (resolve, reject) {
            var data;
            console.log(partialName);
            switch (partialName) {
                case 'home':
                    data = {container: $mainContainer, contentDataRoute: '', controller: homeController};
                    break;
                case 'sign-up-form':
                    data = {container: $mainContainer, contentDataRoute: '', controller: signupController};
                    break;
                case 'sign-up-group':
                    data = {container: $mainContainer, contentDataRoute: '', controller: signupGroupController};
                    break;
                case 'group-nav':
                    data = {
                        container: $mainContainer,
                        contentDataRoute: '/users/groups',
                        controller: groupNavController
                    };
                    break;
                case 'feed':
                    data = {container: $groupContainer, contentDataRoute: '', controller: feedController};
                    break;
                case 'meetings':
                    data = {
                        container: $groupContainer, contentDataRoute: '', controller: meetingsController
                    };
                    break;
                case 'todo-list':
                    data = {container: $groupContainer, contentDataRoute: 'groups/tasks', controller: todoController};
                    break;
                case 'chat':
                    data = {container: $groupContainer, contentDataRoute: '', controller: chatController};
                    break;
                case 'calendar':
                    data = {
                        container: $groupContainer, contentDataRoute: '', controller: calendarController
                    };
                    break;
                case 'add-member':
                    data = {container: $groupContainer, contentDataRoute: '', controller: membersController};
                    break;
                //DEBUG:

                default:
                    data = {container: $mainContainer, contentDataRoute: '', controller: homeController};
                    break;
            }

            resolve(data);
        });


        return promise;
    };

    function getContext(action) {
        var promise = new Promise(function (resolve, reject) {
                    var route = action.contentDataRoute;
                    var query = {
                        name: JSON.parse(localStorage.getItem('current-group')),
                        user: JSON.parse(localStorage.getItem('user'))
                    }
                    $.ajax({
                        url: route,
                        contentType: 'application/json',
                        data: query,
                        success: function (data) {
                            console.log('SUCCESS!!!!');


                            resolve({action: action, info: data});
                        },
                        error: function (err) {
                            console.log('ERROR' + err);
                            toastr.error('Error: ' + err);
                            reject(err);
                        }
                    })
                }
            )
            ;
        return promise;
    }

    function test(action, context, url) {
        var promise = new Promise(function (resolve, reject) {
            action.container.load(url, function () {
                $.get(url, function (source) {
                    var template = handlebars.compile(source);
                    var html = template(context);
                    resolve(action);
                    action.container.html(html);
                });
            });
        });

        return promise;
    }

    return function () {
        console.log('hello from show page');
        var url = 'partials/' + partial + '.html';
        var context;
        // 1. get action
        //2. get contecxt
        //3. test
        //4. set action.controler

        getActionOnHashChange(partial)
            .then(function (data) {

                getContext(data)
                    .then(function (data2) {

                        test(data2.action, data2.info, url)
                            .then(function (data3) {

                                data3.controller();
                            })
                    })
            })


    }();
}
;
