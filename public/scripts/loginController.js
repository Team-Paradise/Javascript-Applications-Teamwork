/**
 * Created by Solara on 26/08/2015.
 */
//TODO: config System.js
function getLoginData(){
    console.log('Heyyy');
    var $loginForm = $('#loginForm');
    $('#loginSubmit').on('click', function (){
        currentUser.username = $('#username').val();
        currentUser.password = $('#pass').val();
        // post data for the user on server, check in db for the user
        
        console.log(currentUser);
        return false;
    });
}

export { getLoginData }
