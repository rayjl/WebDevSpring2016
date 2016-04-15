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
                .login(username, password)
                .then(function(user) {
                    if (!user || user.length > 1) {
                        alert('Incorrect username or password.');
                    } else {
                        console.log(user);
                        $rootScope.user = user;
                        $location.url('/profile');
                    }
                });
        }

    }

})();
