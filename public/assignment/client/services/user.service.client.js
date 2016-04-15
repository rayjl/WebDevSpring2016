(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        // --------------------------------------------------------------------

        // Create a container to return
        var service = {
            login: login,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        // --------------------------------------------------------------------

        function login(username, password) {
            var user = {
                "username" : username,
                "password" : password
            };
            var defer = $q.defer();
            $http
                .post("/api/assignment/login", user)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserById(userId) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/user/" + userId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByUsername(username) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByCredentials(username, password) {
            var defer = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            $http
                .get("/api/assignment/user")
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function createUser(userObj) {
            var defer = $q.defer();
            $http
                .post("/api/assignment/user", userObj)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteUserById(userId) {
            var defer = $q.defer();
            $http
                .delete("/api/assignment/user/" + userId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(userId, userObj) {
            var defer = $q.defer();
            $http
                .put("/api/assignment/user/" + userId, userObj)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

    }

})();