'use strict';

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Add functionality current app
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=alice", findUserByCredentials);

    // ------------------------------------------------------------------------

    function createUser(req, res) {
        var user = req.body;
        model
            .findUserByUsername(user.username)
            .then(function(isUser) {
                if (isUser) {
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

    function findAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function(users) {
                res.json(users);
            });
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

    function findUserByUsername(req, res) {
        var username = req.params.username;
        model
            .findUserByUsername(username)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.params.username,
            password: req.params.password
        };
        model
            .findUserByCredentials(credentials)
            .then(function(user) {
                res.json(user);
            });
    }

    // ------------------------------------------------------------------------

};