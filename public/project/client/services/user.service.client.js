(function(){
    'use strict';

    angular
        .module("ZapApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        // --------------------------------------------------------------------

        // Create a container to return
        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFollowing: addFollowing,
            deleteFollowingById: deleteFollowingById,
        };
        return service;

        // --------------------------------------------------------------------

        function addFollowing(userId, userToFollow) {
            var defer = $q.defer();
            $http
                .post("/api/project/user/" + userId + "/following", userToFollow)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFollowingById(user, followingId) {
            var defer = $q.defer();
            $http
                .delete("/api/project/user/" + user._id + "/following/" + followingId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByCredentials(username, password) {
            var defer = $q.defer();
            $http
                .get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByUsername(username) {
            var defer = $q.defer();
            $http
                .get("/api/project/user?username=" + username)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            $http
                .get("/api/project/user")
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function createUser(user) {
            var defer = $q.defer();
            $http
                .post("/api/project/user", user)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteUserById(userId) {
            var defer = $q.defer();
            $http
                .delete("/api/project/user/" + userId)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(userId, user) {
            var defer = $q.defer();
            $http
                .put("/api/project/user/" + userId, user)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

    }

})();