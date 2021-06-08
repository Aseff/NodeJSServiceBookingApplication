'use strict';
exports.__esModule = true;
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var mongoose = require("mongoose");
var app = express();
var mongoUri = 'mongodb://localhost/alrcsy';
mongoose.connect(mongoUri, function (err) {
    if (err) {
        console.error(err.message);
        console.error(err);
    }
    else {
        console.log('Connected to MongoDB');
    }
});
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1["default"]);
//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
//error handlers
//development error handler
//will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
//production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err['status'] || 500);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports["default"] = app;
