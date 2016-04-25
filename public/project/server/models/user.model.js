'use strict';
var q = require('q');

module.exports = function(db, mongoose) {

    // ------------------------------------------------------------------------

    // Mongoose and MongoDB used
    var UserSchemaP = require("./user.schema.js")(mongoose);
    var UserModelP = mongoose.model("UserModelP", UserSchemaP);

    // ------------------------------------------------------------------------

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        addFollowing: addFollowing,
        deleteFollowingById: deleteFollowingById,
        addSavedListingById: addSavedListingById,
        deleteSavedListingById: deleteSavedListingById
    };
    return api;

    // ------------------------------------------------------------------------

    function addSavedListingById(userId, listingId) {
        var defer = q.defer();
        var user = findUserById(userId);
        for (var i = 0; i < user.savedListings.length; i++) {
            if (user.savedListings[i] == listingId) {
                console.log('Listing already saved for this user.');
                defer.resolve(user);
                return defer.promise;
            }
        }
        user.savedListings.push(listingId);
        updateUser(user._id, user);

        console.log('Listing added for this user.');
        defer.resolve(user);
        return defer.promise;
    }

    function deleteSavedListingById(userId, listingId) {
        var defer = q.defer();
        var user = findUserById(userId);
        for (var i = 0; i < user.savedListings.length; i++) {
            if (user.savedListings[i] == listingId) {
                user.savedListings.splice(i,1);
                updateUser(user._id, user);
                defer.resolve(user);
                return defer.promise;
            }
        }
        console.log('User does not have this listing saved. No action performed.');
        defer.resolve(user);
        return defer.promise;
    }

    function addFollowing(user, userToFollow) {
        var defer = q.defer();

        // Fetch users first
        var user1 = findUserById(user._id);
        var user2 = findUserById(userToFollow._id);

        // Update both
        user1.following.push(user2._id);
        user2.followers.push(user1._id);
        updateUser(user1._id, user1);
        updateUser(user2._id, user2);

        // Return user1
        defer.resolve(user1);
        return defer.promise;
    }

    function deleteFollowingById(user, followingId) {
        var defer = q.defer();

        // Fetch user first
        var user1 = findUserById(user._id);

        // Update it
        var following = user1.following;
        for (var i = 0; i < following.length; i++) {
            var currFollowing = following[i];
            if (currFollowing._id == followingId) {
                user1.following.splice(i,1);
                var user2 = findUserById(followingId);
                for (var j = 0; j < user2.followers.length; j++) {
                    if (user2.followers[j]._id == user1._id) {
                        user2.followers.splice(j,1);
                        updateUser(user1._id, user1);
                        updateUser(user2._id, user2);
                        break;
                    }
                }
                break;
            }
        }
        defer.resolve(user);
        return defer.promise;
    }

    function createUser(userObject) {
        var defer = q.defer();

        console.log('Adding fields to user object.');
        console.log(userObject);
        // Handle the user object
        userObject.firstName = "";
        userObject.lastName = "";
        userObject.following = [];
        userObject.followers = [];
        userObject.savedListings = [];

        console.log('Creating new user.');
        console.log(userObject);
        UserModelP
            .create(userObject, function(err, user) {
                if (err) {
                    console.log(err);
                    console.log('User not created.');
                    defer.reject(err);
                } else {
                    console.log('User created.');
                    defer.resolve(user);
                }
            });
        return defer.promise;
    }

    function findAllUsers() {
        var defer = q.defer();
        UserModelP
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
        UserModelP
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
        UserModelP
            .update({_id: id}, {$set: userObj}, function(err, user) {
                UserModelP.find(function(err, user) {
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
        UserModelP
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
        UserModelP
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
        UserModelP
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