(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        /*
         * @param   {string} username       : user name of login attempt
         * @param   {string} password       : password of login attempt
         */
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password, function(user) {
                    if (!user) {
                        alert('Incorrect username or password.');
                    } else {
                        $rootScope.user = user;
                        $location.url('/profile');
                    }
                });
        }

    }

})();
