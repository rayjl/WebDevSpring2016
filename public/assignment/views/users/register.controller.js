(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
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
                email: user.email
            };

            // Create a new user using the user service factory
            UserService
                .createUser(newUser, function(user) {
                    $rootScope.user = user;
                    $location.url('/profile');
                });
        }

    }

})();
