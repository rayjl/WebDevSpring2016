'use strict';

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app, model) {

    // ------------------------------------------------------------------------

    // Security assignment update
    var auth = authenticated;
    var adminAuth = isAdmin;
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.post  ('/api/assignment/user',     auth, createUser);
    app.get   ('/api/assignment/loggedin',       loggedin);
    app.get   ('/api/assignment/user',     auth, findUsers);
    app.get   ("/api/assignment/user/:id",       findUserById);
    app.put   ('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUser);

    app.get   ('/api/assignment/admin/user', adminAuth, adminFindAllUsers);
    app.get   ('/api/assignment/admin/user/:id', adminAuth, adminFindUserById);
    app.post  ('/api/assignment/admin/user', adminAuth, adminCreateUser);
    app.delete('/api/assignment/admin/user/:id', adminAuth, adminDeleteUser);
    app.put   ('/api/assignment/admin/user/:id', adminAuth, adminUpdateUser);

    // ------------------------------------------------------------------------

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // ------------------------------------------------------------------------

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        console.log("Attempting to login.");
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .findUserByUsername(user.username)
            .then(function(dbUser) {
                if (dbUser) {
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

    function register(req, res) {
        console.log("Attempting to register.");
        var newUser = req.body;
        newUser.roles = ['student'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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

    function adminFindAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function adminFindUserById(req, res) {
        var id = req.params.id;
        model
            .findUserById(id)
            .then(function(user) {
                res.json(user);
            });
    }

    function adminCreateUser(req, res) {
        console.log("Attempting to create new user by admin.");
        var newUser = req.body;
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.adminCreateUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function adminDeleteUser(req, res) {
        var id = req.params.id;
        model
            .deleteUser(id)
            .then(function(users) {
                res.json(users);
            });
    }

    function adminUpdateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        model
            .updateUser(id , user)
            .then(function(users) {
                res.json(users);
            });
    }

    function isAdmin(req, res, next) {
        var adminUser = req.user;
        //console.log(req);
        if (loggedin) {//} && adminUser.roles.indexOf("admin") > 0) {
            next();
        } else {
            console.log('Not admin authorized.');
            res.send(403);
        }
    }

    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            console.log('Not authorized.');
            res.send(401);
        } else {
            next();
        }
    }

    // ------------------------------------------------------------------------

};