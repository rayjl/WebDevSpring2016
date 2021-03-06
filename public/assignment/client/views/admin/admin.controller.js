(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        var pageUser = $rootScope.user;
        $scope.adminAddUser = adminAddUser;
        $scope.adminEditUser = adminEditUser;
        $scope.adminDeleteUser = adminDeleteUser;
        $scope.adminUpdateUser = adminUpdateUser;

        // --------------------------------------------------------------------

        if (pageUser) {
            init();
        } else {
            console.log("No one logged in.");
            $location.url('/home');
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

        function adminAddUser(selectedUser) {
            var newUser = {
                roles: selectedUser.roles,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                username: selectedUser.username,
                password: selectedUser.password,
                emails: [selectedUser.emails],
                phones: [selectedUser.phones]
            };

            // Create a new user using the user service factory
            UserService
                .adminCreateUser(newUser)
                .then(function(user) {
                    init();
                    $scope.selectedUser = user;
                });
        }

        function adminEditUser(index) {
            var selectedUser = $scope.users[index];
            if (selectedUser._id == pageUser._id) {
                console.log("Cannot selected logged in user on this page.");
                return;
            }
            $scope.selectedUser = {
                _id: selectedUser._id,
                roles: selectedUser.roles,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                username: selectedUser.username,
                password: selectedUser.password,
                emails: selectedUser.emails,
                phones: selectedUser.phones
            };
        }

        function adminDeleteUser(index) {
            var selectedUser = $scope.users[index];
            if (selectedUser._id == pageUser._id) {
                console.log("Cannot delete logged in user.");
                return;
            }
            UserService
                .adminDeleteUserById(selectedUser._id)
                .then(function(users) {
                    init();
                });
        }

        function adminUpdateUser(selectedUser) {
            UserService
                .adminUpdateUser(selectedUser._id, selectedUser)
                .then(function(users) {
                    init();
                });
        }

    }

})();
