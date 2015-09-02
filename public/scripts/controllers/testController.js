export default function testController() {
    var $groupContainer = $('#group-container');
    $groupContainer.html('');
    //CREATE GROUP
    var btnSumbit = $('#group-signup-submit');
    var newGroup;
    btnSumbit.on('click', function () {
        console.log('CLICK');
        newGroup = {
            name: $('#input-group-name').val(),
            password: $('#input-group-password').val(),
            description: $('#input-group-desc').val(),
            git: $('#input-git-link').val()
        };

        $.ajax({
            method: "POST",
            url: '/groups/signup',
            contentType: 'application/json',
            data: JSON.stringify(newGroup),
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
    // ADD MEMBER TO PREV REGISTRED GROUP
    var btnAdd = $('#add-member-btn');
    btnAdd.on('click', function () {
        var member = $('#input-add-member').val();


        $.ajax({
            method: 'POST',
            url: '/groups/add/member',
            contentType: 'application/json',
            data: JSON.stringify({name: 'Paradise', username: member}),
            success: function (data) {
                console.log('MEMBER ADDED');
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });

        $.ajax({
            method: 'POST',
            url: '/users/add/group',
            contentType: 'application/json',
            data: JSON.stringify({username:member, group: 'Paradise' }),
            success: function(data){
                console.log('GRPOUP ADDED');
                console.log(data);
            },
            error: function(data){
                console.log('Error on adding the user as group member');
                console.log(data);
            }
        });
    });//end btn onclick
}