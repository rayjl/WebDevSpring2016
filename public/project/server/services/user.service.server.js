'use strict';

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Add functionality current app
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/user/:id/following", addFollowing);
    app.delete("/api/assignment/user/:id/following/:fid", deleteFollowing);

    // ------------------------------------------------------------------------

    function addFollowing(req, res) {
        var userId = req.params.id;
        var userToFollow = req.body;
        model
            .findUserById(userId)
            .then(function(user) {
                model
                    .addFollowing(user, userToFollow)
                    .then(function(user) {
                        res.json(user);
                    });
            });
    }

    function deleteFollowing(req, res) {
        var userId = req.params.id;
        var fid = req.params.fid;
        model
            .findUserById(userId)
            .then(function(user) {
                model
                    .deleteFollowingById(user, fid)
                    .then(function(user) {
                        res.json(user);
                    });
            });
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .findUserByUsername(user.username)
            .then(function(user) {
                if (user) {
                    res.json(null);
                } else {
                    model
                        .createUser(user)
                        .then(function(users) {
                            res.json(users);
                        });
                }
            });
    }

    function findUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            model
                .findUserByCredentials(credentials)
                .then(function(user) {
                    res.json(user);
                });
        } else if (username) {
            model
                .findUserByUsername(username)
                .then(function(user) {
                    res.json(user);
                });
        } else {
            model
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                });
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        model
            .findUserById(id)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        model
            .updateUser(id , user)
            .then(function(users) {
                res.json(users);
            });
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        model
            .deleteUser(id)
            .then(function(users) {
                res.json(users);
            });
    }

    // ------------------------------------------------------------------------

};