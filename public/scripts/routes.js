import 'lib/jquery/dist/jquery.js';
import homeController from './controllers/homeController.js';
import feedController from './controllers/feedController.js';
import meetingsController from './controllers/meetingsController.js';
import signupController from './controllers/signupController.js';
import signupGroupController from './controllers/signupGroupController.js';
import todoController from './controllers/todoController.js';
import calendarController from './controllers/calendarController.js';
import groupNavController from './controllers/groupNavController.js';
import chatController from './controllers/chatController.js';
import toastr from 'lib/toastr/toastr.js';

import handlebars from 'lib/handlebars/handlebars.js';

import testController from './controllers/testController.js';

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
                    data = {container: $mainContainer, contentDataRoute: '/users/groups', controller: groupNavController};
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
                    data = {container: $groupContainer, contentDataRoute: '/groups/tasks', controller: todoController};
                    break;
                case 'chat':
                    data = {container: $groupContainer, contentDataRoute: '', controller: chatController};
                    break;
                case 'calendar':
                    data = {
                        container: $groupContainer, contentDataRoute: '', controller: calendarController
                    };
                    break;
                //DEBUG:
                case 'test':
                    data = {container: $mainContainer, contentDataRoute: '', controller: testController};
                    break;
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
            $.ajax({
                url: route,
                contentType: 'application/json',
                data: {name: 'Paradise', user: JSON.parse(localStorage.getItem('user'))},
                success: function (data) {
                    console.log('SUCCESS!!!!');
                    console.log(route);
                    console.log(data);
                    console.log(data);

                    resolve({action:action, info: data});
                },
                error: function (err) {
                    console.log('ERROR' + err);
                    toastr.error('Error: ' + err);
                    reject(err);
                }
            })
        });
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
                console.log('FIRST');
                console.log(data);

                getContext(data)
                    .then(function (data2) {
                        console.log('SECOND');
                        console.log(data2.info);

                        test(data2.action, data2.info, url)
                        .then(function(data3){
                                console.log('THIRD!!!');
                                console.log(data3);
                                data3.controller();
                            })
                    })
            })


    }();
};