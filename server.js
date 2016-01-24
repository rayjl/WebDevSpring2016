/**
 * Server source code for assignment 1
 * Copied over from the assignment 1 sheet
 */

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);