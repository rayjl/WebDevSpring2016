(function() {
    'use strict';

    angular
        .module("ZapApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location, UserService) {
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        var user = $rootScope.user;

        // Execute init to fill the admin page if valid user and is an admin
        if (user && user.accountType.indexOf('admin') >= 0) {
            init();
        } else {
            alert('User is not a valid admin.');
        }

        /*
         * This function inits the admin page
         */
        function init() {
            UserService
                .findAllUsers(function(users) {
                    $scope.users = users;
                });
        }

        /*
         * @param   {object} newUser    : new user to add
         */
        function addUser(newUser) {
            // User has fields from form: username | password | accountType
            var newUser = {
                username: newUser.username,
                password: newUser.password,
                accountType: newUser.accountType
            };

            // Check if the user name already exists, if it does don't do anything
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].username == newUser.username) {
                    alert('Username already exists.');
                    return;
                }
            }

            // Create a new user using the user service factory
            UserService
                .createUser(newUser, function(user) {
                    UserService
                        .findAllUsers(function(users) {
                            $scope.users = users;
                        })
                });
        }

        /*
         * @param   {object} selectedUser   : selected user to update
         */
        function updateUser(selectedUser) {
            UserService
                .updateUser(selectedUser._id, selectedUser, function(user) {
                    UserService
                        .findAllUsers(function(users) {
                            $scope.users = users;
                        })
                })
        }

        /*
         * @param   {int} index     : index of user to remove
         */
        function removeUser(index) {
            if ($scope.users[index] != user) {
                UserService
                    .deleteUserById($scope.users[index]._id, function(users) {
                        $scope.users = users;
                    })
            }
        }

        /*
         * @param   {int} index     : index of user to select
         */
        function selectUser(index) {
            var inputUser = {
                "_id": $scope.users[index]._id,
                "username": $scope.users[index].username,
                "password": $scope.users[index].password,
                "accountType": $scope.users[index].accountType
            };
            $scope.inputUser = inputUser;
        }


    }

})();