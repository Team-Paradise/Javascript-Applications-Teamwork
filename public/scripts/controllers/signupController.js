import toastr from 'lib/toastr/toastr.js';
import {validUserNamePassword, validName, validEmail} from '../validator.js';
import {addClient} from './../controllers/chatDataManager.js';
import {toggleLoginPartials} from './../controllers/loginController.js';



export default function signupController() {
   // console.log('Hello from SIGN UP controller');
    var $username = $('#inputUsername'),
        $password = $('#inputPassword'),
        $passConfirm = $('#confirmPassword'),
        $email = $('#inputEmail'),
        $firstName = $('#firstName'),
        $lastName = $('#lastName'),
        $signUpSubmit = $('#signUpSubmit'),
        $aboutme = $('#aboutMe');

    $username.focusout(function () {
        if (!validUserNamePassword($username.val())) {
            $username.val('');
            // TODO tooltip
        }
    });

    $password.focusout(function () {
        if (!validUserNamePassword($password.val())) {
            $password.val('');
            // TODO tooltip
        }
    });

    $passConfirm.focusout(function () {
        if ($passConfirm.val() !== $password.val()) {
            $passConfirm.val('');
            // TODO tooltip
        }
    });

    $email.focusout(function () {
        if (!validEmail($email.val())) {
            $email.val('');
            // TODO tooltip
        }
    })

    $firstName.focusout(function () {
        if (!validName($firstName.val())) {
            $firstName.val('');
            // TODO tooltip
        }
    });

    $lastName.focusout(function () {
        if (!validName($lastName.val())) {
            $lastName.val('');
            // TODO tooltip
        }
    });

    $signUpSubmit.on('click', function () {
        if (validUserNamePassword($username.val()) &&
            validUserNamePassword($passConfirm.val()) &&
            validEmail($email.val()) &&
            validName($firstName.val()) && validName($lastName.val())) {
            var newUser = {
                username: $username.val(),
                firstName: $firstName.val(),
                lastName: $lastName.val(),
                passHash: CryptoJS.SHA1($password.val()).toString(),
                email: $email.val(),
                aboutMe: $aboutme.val()
            };

          //  console.log(newUser);
            $.ajax({
                method: 'POST',
                url: '/signup',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function (data) {

                    localStorage.setItem('user', JSON.stringify(data.username));
                    localStorage.setItem('is-logged', true);
                    localStorage.setItem('access-token', JSON.stringify(data.authKey));


                    // TODO: Login the user automatic
                    toggleLoginPartials(data.username);
                    addClient(data.username);
                    location.hash = "#home";
                    // todo: save tokan also where Zlatko save the user name in local storage!!!
                },
                error: function (data) {
                    switch (data.status) {
                        case 422:
                            toastr.options = {"positionClass": "toast-top-center"};
                            toastr.error('User with this username already exist! Please choose another one.');
                            break;
                        case 404:
                            toastr.error('Sadly.. something happand with the database..');
                            break;
                        case '422':
                           // console.log('string');
                            break;
                        default:
                            break;
                    }


                }
            });
        }
        else {
         //   console.log('invalid user data');
            // TODO tooltip
            return false;
        }
    })

};