"use strict";
exports.__esModule = true;
var express = require("express");
var movie_1 = require("../schemas/movie");
var generateId_1 = require("../generationId/generateId");
var router = express.Router();
//Get All Movies
router.get('/', function (req, res) {
    movie_1.Movie.find({}, function (err, movies) {
        if (err) {
            res.status(500).json({ info: 'Error executing query.', error: err });
        }
        ;
        if (movies) {
            var movieList = {
                movie: movies.map(function (m) {
                    var movieResult = {
                        title: m.title,
                        year: m.year,
                        director: m.director,
                        actor: m.actor
                    };
                    return movieResult;
                })
            };
            res.json(movieList);
        }
    });
});
// Add Movie
router.post('/', function (req, res) {
    var movie = req.body;
    movie_1.Movie.find({}, { id: 1 }, function (err, movies) {
        movie.id = generateId_1.generateId(movies);
        movie_1.Movie.insertMany([movie], function (err, result) {
            if (err) {
                res.sendStatus(500);
            }
            var resId = { id: result[0].id };
            res.json(resId);
        });
    });
});
// //Get a movie with id
router.get('/:id', function (req, res) {
    movie_1.Movie.findOne({ id: req.params.id }, { id: 0, _id: 0, __v: 0 }, function (err, movie) {
        if (err) {
            res.status(500).json({ info: 'Error executing query.', error: err });
        }
        if (movie) {
            var movieResult = {
                title: movie.title,
                year: movie.year,
                director: movie.director,
                actor: movie.actor
            };
            res.json(movieResult);
        }
        else {
            res.status(404);
        }
    });
});
//Delete movie
router["delete"]('/:id', function (req, res) {
    var id = req.params.id;
    movie_1.Movie.remove({ id: req.params.id }, function (err) {
        if (err) {
            res.status(404);
        }
        res.status(200).end();
    });
});
//Put update movie
router.put('/:id', function (req, res) {
    var movie = req.body;
    movie_1.Movie.findOneAndUpdate({ id: req.params.id }, movie, { upsert: true }, function (err, result) {
        if (err) {
            res.status(404);
        }
        res.status(200).end();
    });
});
//Search   find?year={year}&orderby={field} 
router.get('/find', function (req, res) {
    var year = parseInt(req.query.year);
    var orderBy = req.query.orderby;
    if (orderBy === 'Title' || orderBy === 'Director') {
        var sort = orderBy === 'Title' ? { title: 1 } : { director: 1 };
        movie_1.Movie.find({ year: year }, { id: 0, _id: 0, __v: 0 }, { sort: orderBy.toLowerCase() }, function (err, movies) {
            if (err) {
                res.status(500).json({ info: 'Error executing query.', error: err });
            }
            if (movies) {
                var movieIdList = {
                    id: movies.map(function (m) { return m.id; })
                };
                res.json(movieIdList);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
});
exports["default"] = router;
