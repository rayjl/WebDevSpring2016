'use strict';
var q = require('q');

module.exports = function(db, mongoose) {

    // ------------------------------------------------------------------------

    // Mongoose and MongoDB used
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------

    function createUser(userObject) {
        var defer = q.defer();

        // Handle the user object
        userObject.emails = [userObject.email];
        delete userObject.email;
        userObject.firstName = "";
        userObject.lastName = "";
        userObject.phones = [""];

        console.log(userObject);
        UserModel
            .create(userObject, function(err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });
        return defer.promise;
    }

    function findAllUsers() {
        var defer = q.defer();
        UserModel
            .find(function(err, users) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(users);
                }
            });
        return defer.promise;
    }

    function findUserById(id) {
        var defer = q.defer();
        UserModel
            .find({_id: id}, function(err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });
        return defer.promise;
    }

    function updateUser(id, userObj) {
        var defer = q.defer();
        delete userObj._id;
        UserModel
            .update({_id: id}, {$set: userObj}, function(err, user) {
                UserModel.find(function(err, user) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(user);
                    }
                })
            });
        return defer.promise;
    }

    function deleteUser(id) {
        var defer = q.defer();
        UserModel
            .remove({_id: id}, function(err, status) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(status);
                }
            });
        return defer.promise;
    }

    function findUserByUsername(username) {
        var defer = q.defer();
        UserModel
            .findOne({username: username}, function (err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });
        return defer.promise;
    }

    function findUserByCredentials(credentials) {
        var defer = q.defer();
        UserModel
            .findOne({username: credentials.username, password: credentials.password}, function (err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });
        return defer.promise;
    }

};