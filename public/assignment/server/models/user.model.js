'use strict';
var users = require('user.mock.json');

module.exports = function() {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(userObject) {

        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                return users[i];
            }
        }
        return null;
    }

    function updateUser(id, userObj) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {



            }
        }
    }

    function deleteUser(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users.splice(i,1);
                break;
            }
        }
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                return users[i];
            }
        }
        return null;
    }

};