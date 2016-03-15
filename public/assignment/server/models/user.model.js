'use strict';
var q = require('q');

module.exports = function() {

    var users = require('./user.mock.json');

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
        var defer = q.defer();
        users.push(userObject);
        defer.resolve(users);
        return defer.promise;
    }

    function findAllUsers() {
        var defer = q.defer();
        defer.resolve(users);
        return defer.promise;
    }

    function findUserById(id) {
        var defer = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                defer.resolve(users[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function updateUser(id, userObj) {
        var defer = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users[i].firstName = userObj.firstName;
                users[i].lastName = userObj.lastName;
                users[i].username = userObj.username;
                users[i].password = userObj.password;
                defer.resolve(users);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function deleteUser(id) {
        var defer = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users.splice(i,1);
                defer.resolve(users);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function findUserByUsername(username) {
        var defer = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                defer.resolve(users[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

    function findUserByCredentials(credentials) {
        var defer = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                defer.resolve(users[i]);
                return defer.promise;
            }
        }
        defer.resolve(null);
        return defer.promise;
    }

};