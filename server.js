#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();

//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var home      = 'This is a test for server.js'

app.get('/', function (req, res) {
    res.send(home)
})

app.listen(port,ipaddress)