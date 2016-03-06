(function(){
    'use strict';

    angular
        .module("ZapApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        // Default users list
        var admin = {
            "_id"           : 888,
            "firstName"     : "Raymond",
            "lastName"      : "Li",
            "username"      : "admin",
            "password"      : "admin",
            "accountType"   : "admin",
            "following"     : [],
            "followers"     : [],
            "savedListings" : []
        };
        var alice = {
            "_id"           : 123,
            "firstName"     : "Alice",
            "lastName"      : "Wonderland",
            "username"      : "alice",
            "password"      : "alice",
            "accountType"   : "user",
            "following"     : [],
            "followers"     : [],
            "savedListings" : []
        };
        var bob = {
            "_id"           : 234,
            "firstName"     : "Bob",
            "lastName"      : "Hope",
            "username"      : "bob",
            "password"      : "bob",
            "accountType"   : "user",
            "following"     : [],
            "followers"     : [],
            "savedListings" : []
        };
        var charlie = {
            "_id"           : 345,
            "firstName"     : "Charlie",
            "lastName"      : "Brown",
            "username"      : "charlie",
            "password"      : "charlie",
            "accountType"   : "user",
            "following"     : [],
            "followers"     : [],
            "savedListings" : []
        };
        alice.following = [];
        alice.followers = [bob,charlie];
        bob.following = [alice];
        bob.followers = [charlie];
        charlie.following = [alice, bob];
        charlie.followers = [];
        var users = [admin, alice, bob, charlie];

        // Create a container to return
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFollowing: addFollowing,
            addFollower: addFollower,
            deleteFollowingById: deleteFollowingById,
            deleteFollowerById: deleteFollowerById,
            users: users
        };
        return model;

        /*
         * @param   {object} firstUser  : main user
         * @param   {object} secondUser : user to add to following
         * @param   {func} callback     : callback function
         */
        function addFollowing(firstUser, secondUser, callback) {


        }

        /*
         * @param   {object} firstUser  : main user
         * @param   {object} secondUser : user to add to follower
         * @param   {func} callback     : callback function
         */
        function addFollower(firstUser, secondUser, callback) {


        }

        /*
         * @param   {object} user       : main user
         * @param   {int} followingId   : id of following to delete
         * @param   {func} callback     : callback function
         */
        function deleteFollowingById(user, followingId, callback) {
            var following = user.following;
            for (var i = 0; i < following.length; i++) {
                var currFollowing = following[i];
                if (currFollowing._id == followingId) {
                    user.following.splice(i,1);
                    for (var j = 0; j < currFollowing.followers.length; j++) {
                        if (currFollowing.followers[j]._id == user._id) {
                            currFollowing.followers.splice(j,1);
                            break;
                        }
                    }
                    break;
                }
            }
            callback(user);
        }

        /*
         * @param   {object} user       : main user
         * @param   {int} followerId    : id of follower to delete
         * @param   {func} callback     : callback function
         */
        function deleteFollowerById(user, followerId, callback) {
            var followers = user.followers;
            for (var i = 0; i < followers.length; i++) {
                var currFollower = followers[i];
                if (currFollower._id == followerId) {
                    user.followers.splice(i,1);
                    for (var j = 0; j < currFollower.following.length; j++) {
                        if (currFollower.following[j]._id == user._id) {
                            currFollower.following.splice(j,1);
                            break;
                        }
                    }
                    break;
                }
            }
            callback(user);
        }

        /*
         * @param   {object} user       : user to set
         */
        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        /*
         *
         */
        function getCurrentUser(user) {
            return $rootScope.user;
        }

        /*
         * @param   {string} username   : user name to check
         * @param   {string} password   : password to check
         * @param   {func} callback     : callback function to use
         */
        function findUserByCredentials(username, password, callback) {
            // Iterate over the array of current users
            var user = null;
            for (var i = 0; i < users.length; i++) {
                // Check for match with username and password
                if (users[i].username == username && users[i].password == password) {
                    user = users[i];
                    break;
                }
            }
            // Callback
            callback(user);
        }

        /*
         * @param   {func} callback     : callback function to use
         */
        function findAllUsers(callback) {
            callback(users);
        }

        /*
         * @param   {object} user       : user object to add
         * @param   {func} callback     : callback function to use
         */
        function createUser(user, callback) {
            user._id = (new Date).getTime();
            user.firstName = [];
            user.lastName = [];
            user.following = [];
            user.followers = [];
            user.savedListings = [];
            users.push(user);
            callback(user);
        }

        /*
         * @param   {int} userId        : id of user to remove
         * @param   {func} callback     : callback function to use
         */
        function deleteUserById(userId, callback) {
            // Iterate over the users
            for (var i = 0; i < users.length; i++) {
                // Remove user from list if found
                if (users[i]._id == userId) {
                    // First remove the user from other users' following list
                    for (var j = 0; j < users.length; j++) {
                        if (users[j]._id != userId) {
                            for (var k = 0; k < users[j].following.length; k++) {
                                if (users[j].following[k]._id == userId) {
                                    users[j].following.splice(k,1);
                                }
                            }
                        }
                    }
                    users.splice(i,1);
                    break;
                }
            }
            // Callback
            callback(users);
        }

        /*
         * @param   {int} userId        : id of user to update
         * @param   {object} user       : user object containing new properties
         * @param   {func} callback     : callback function to use
         */
        function updateUser(userId, user, callback) {
            // Iterate over the users
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    // Update
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].accountType = user.accountType;

                    // Callback
                    callback(users[i]);
                    break;
                }
            }
        }

    }

})();