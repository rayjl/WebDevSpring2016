(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        var pageUser = $rootScope.user;
        $scope.adminAddUser = adminAddUser;
        $scope.adminEditUser = adminEditUser;
        $scope.adminDeleteUser = adminDeleteUser;
        $scope.adminUpdateUser = adminUpdateUser;

        // --------------------------------------------------------------------

        if (pageUser) {
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

        function adminAddUser(selectedUser) {
            var newUser = {
                roles: [],
                firstName: [],
                lastName: [],
                username: selectedUser.username,
                password: selectedUser.password,
                emails: [selectedUser.emails],
                phones: []
            };

            // Create a new user using the user service factory
            UserService
                .register(newUser)
                .then(function(user) {
                    init();
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
                .deleteUserById(selectedUser._id)
                .then(function(users) {
                    init();
                });
        }

        function adminUpdateUser(selectedUser) {
            UserService
                .updateUser(selectedUser._id, selectedUser)
                .then(function(users) {
                    init();
                });
        }

    }

})();
