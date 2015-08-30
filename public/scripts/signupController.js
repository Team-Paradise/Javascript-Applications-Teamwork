export default function signupController() {
        console.log('Hello from SIGN UP controller');
        var $signUpSubmit = $('#signUpSubmit');

        $signUpSubmit.on('click', function () {
            var $username = $('#inputUsername').val(),
                $email = $('#inputEmail').val(),
                $password = $('#inputPassword').val();

            var newUser = {
                username: $username,
                email: $email,
                password: $password
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

            return false;
        })

    }