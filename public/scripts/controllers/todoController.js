import handlebars from 'lib/handlebars/handlebars.js';

export default function todoController() {
    // TODO: think where to store wich is the current user + open group


    var currentGroupNameTest = "Paradise";
    console.log('todo page loaded');
  /*  $("#sortable").sortable();
    $("#sortable").disableSelection();*/

    countTodos();

// all done btn
    $("#checkAll").click(function () {
        AllDone();
    });

//create todo
    $('.add-todo').on('keypress', function (e) {
        e.preventDefault
        if (e.which == 13) {
            if ($(this).val() != '') {
                var todo = $(this).val();
                createTodo(todo);
                saveTodo(currentGroupNameTest,todo);
                countTodos();
            } else {
                // some validation
            }
        }
    });
// mark task as done
    $('.todolist').on('change', '#sortable li input[type="checkbox"]', function () {
        if ($(this).prop('checked')) {
            var doneItem = $(this).parent().parent().find('label').text();
            $(this).parent().parent().parent().addClass('remove');
            done(doneItem);
            countTodos();
        }
    });

//delete done task from "already done"
    $('.todolist').on('click', '.remove-item', function () {
        removeItem(this);
    });

// count tasks
    function countTodos() {
        var count = $("#sortable li").length;
        $('.count-todos').html(count);
    }

//create task
    function createTodo(text) {
        var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />' + text + '</label></div></li>';
        $('#sortable').append(markup);
        $('.add-todo').val('');


    }

//mark task as done
    function done(doneItem) {
        var done = doneItem;
        var markup = '<li>' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
        $('#done-items').append(markup);
        $('.remove').remove();
    }

//mark all tasks as done
    function AllDone() {
        var myArray = [];

        $('#sortable li').each(function () {
            myArray.push($(this).text());
        });

        // add to done
        for (var i = 0; i < myArray.length; i++) {
            $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
        }

        // myArray
        $('#sortable li').remove();
        countTodos();
    }

//remove done task from list
    function removeItem(element) {
        $(element).parent().remove();
    }

// save task to database
    function saveTodo(groupName, todo){
        $.ajax({
            method: 'POST',
            url:'/groups/add/task',
            contentType: 'application/json',
            data: JSON.stringify({name: groupName, task: todo}),
            success: function(data)
            {
                console.log(data)
                console.log(data.tasks);

            },
            error: function(data){
                console.log('Error saving task: ');
                console.log(data);
            }
        });
    }
}