
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://taxibooker-fcd3e.firebaseio.com/");
var fs = require('fs');
var path = require('path');
var request = require('request');
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();



app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'root')));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});




app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
