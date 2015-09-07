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
          //  console.log(partialName);
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
                        contentDataRoute: 'users/groups',
                        controller: groupNavController
                    };
                    break;
                case 'feed':
                    data = {container: $groupContainer, contentDataRoute: 'groups/feed', controller: feedController};
                    break;
                case 'meetings':
                    data = {
                        container: $groupContainer, contentDataRoute: 'groups/meetings', controller: meetingsController
                    };
                    break;
                case 'todo-list':
                    data = {container: $groupContainer, contentDataRoute: 'groups/tasks', controller: todoController};
                    break;
                case 'chat':
                    data = {container: $groupContainer, contentDataRoute: 'groups/messages', controller: chatController};
                    break;
                case 'calendar':
                    data = {
                        container: $groupContainer, contentDataRoute: 'groups/meetings', controller: calendarController
                    };
                    break;
                case 'add-member':
                    data = {container: $groupContainer, contentDataRoute: '', controller: membersController};
                    break;
                case 'soon':
                    data = {container: $groupContainer, contentDataRoute: '', controller: chatController};
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
                        headers: {
                            'x-authkey': JSON.parse(localStorage.getItem('access-token'))
                        },
                        success: function (data) {
                         //   console.log('SUCCESS!!!!');


                            resolve({action: action, info: data});
                        },
                        error: function (err) {

                            var message = JSON.parse(err.responseText).message || 'Something happend..';
                            // toastr.error('Error: ' + message);

                            reject({
                                message: message
                            });
                        }
                    })
                }
            )
            ;
        return promise;
    }

    function test(action, context, url) {
        console.log(context);
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
     //   console.log('hello from show page');
        var url = 'partials/' + partial + '.html';
        var context;
        // 1. get action
        //2. get contecxt
        //3. test
        //4. set action.controler

        getActionOnHashChange(partial)
            .then(function (action) {

                getContext(action)
                    .then(function (data) {
                        test(data.action, data.info, url)
                            .then(function (action) {
                                $("body").animate({scrollTop: 0}, 0);
                                action.controller();
                            })
                    }, function (err) {
                        if (err) {
                          //  console.log(err);
                            var message = err.message || 'Something happend.. line 139';
                            toastr.error(message);
                            return;
                        }

                    })
            })


    }();
}
;
