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
            var newUser = {
                roles: [],
                firstname: [],
                lastname: [],
                username: user.username,
                password: user.password,
                emails: [user.email],
                phones: []
            };

            // Create a new user using the user service factory
            UserService
                .createUser(newUser)
                .then(function(user) {
                    $rootScope.user = user;
                    $location.url('/profile');
                });
        }

    }

})();
