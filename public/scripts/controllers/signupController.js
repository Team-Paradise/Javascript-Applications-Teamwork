import toastr from 'lib/toastr/toastr.js';
import {validUserNamePassword, validName, validEmail} from '../validator.js';

export default function signupController() {
    console.log('Hello from SIGN UP controller');
    var $username = $('#inputUsername'),
        $password = $('#inputPassword'),
        $passConfirm = $('#confirmPassword'),
        $email = $('#inputEmail'),
        $firstName = $('#firstName'),
        $lastName = $('#lastName'),
        $signUpSubmit = $('#signUpSubmit');

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

    $passConfirm.focusout(function() {
        if ($passConfirm.val() !== $password.val()) {
            $passConfirm.val('');
            // TODO tooltip
        }
    });

    $email.focusout(function() {
        if (!validEmail($email.val())) {
            $email.val('');
            // TODO tooltip
        }
    })

    $firstName.focusout(function() {
        if (!validName($firstName.val())) {
            $firstName.val('');
            // TODO tooltip
        }
    });

    $lastName.focusout(function() {
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
                email: $email.val(),
                password: $password.val(),
                firstName: $firstName.val(),
                lastName: $lastName.val()
            };
            console.log(newUser);
            $.ajax({
                method: 'POST',
                url: '/signup',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function (data) {
                    console.log('POST success! ');
                    console.log(data);
                    console.log('-----');
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
                            console.log('string');
                            break;
                        default:
                            break;
                    }

                }
            });
        }
        else {
            console.log('invalid user data')
            // TODO tooltip
            return false;
        }
    })

};