'use strict';
exports.__esModule = true;
var express = require("express");
var movie_service_1 = require("../services/movie_service");
var router = express.Router();
router.use('/movies', movie_service_1["default"]);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
exports["default"] = router;
