(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        // Default users list
        var users = [];
        users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        // Create a container to return all this stuff
        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            users : users
        };
        return service;

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
                if (users[i].username = username && users[i].password == password) {
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
                    users.splice(i,1);
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
                    users[i] = user;
                    // Callback
                    callback(users[i]);
                    break;
                }
            }
        }

    }

})();