// Express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

// ----------------------------------------------------------------------------

// Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------------------------------------------

// Multer
var multer = require('multer');
app.use(multer());

// ----------------------------------------------------------------------------

// Security
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------------------------------------------------------

// MongoDB
var mongoose = require('mongoose');

// localhost connection
var connectionString = 'mongodb://localhost/cs5610';

// OpenShift connection
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString =
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// db connection instance
var db = mongoose.connect(connectionString);

// ----------------------------------------------------------------------------

// Application Connection
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// ----------------------------------------------------------------------------

// Require the other app files...
require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);

// ----------------------------------------------------------------------------

// Listen
app.listen(port, ipaddress);
