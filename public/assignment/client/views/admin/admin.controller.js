(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        var adminUser = $rootScope.user;

        // --------------------------------------------------------------------

        if (adminUser) {
            init();
        }

        function init() {
            UserService
                .adminFindAllUsers()
                .then(function(users) {
                    console.log("Init.");
                    $scope.users = users;
                });
        }

        // --------------------------------------------------------------------

        function adminCreateUser(newUser) {

        }

        function adminFindUser(index) {

        }

        function adminDeleteUser(index) {

        }

        function adminUpdateUser(user) {

        }

    }

})();
