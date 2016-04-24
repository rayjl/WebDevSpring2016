(function(){
    'use strict';

    angular
        .module("ZapApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

        /*
         * @param   {object} user   : new user to add
         */
        function register(user) {
            // User has fields from form: username | password | verifyPassword | email
            var newUser = {
                username: user.username,
                password: user.password,
                email: user.email,
                accountType: "user"
            };

            // Create a new user using the user service factory
            console.log('Creating user.');
            console.log(newUser);
            UserService
                .createUser(newUser)
                .then(function(user) {
                    console.log('User registered. Routing to profile page.');
                    $rootScope.user = user;
                    $location.url('/profile');
                });
        }

    }

})();
