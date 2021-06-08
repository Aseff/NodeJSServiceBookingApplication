"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMovieId = void 0;
const express = require("express");
const movie_1 = require("../schemas/movie");
const router = express.Router();
router.get('/', (req, res) => {
    movie_1.Movie.find({}, { id: 1 }, (err, movies) => {
        if (err) {
            res.status(500).json({ info: 'Error executing query.', error: err });
        }
        ;
        if (movies) {
            const movieList = { movie: movies.map(m => {
                    const movieResult = {
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
router.post('/', function (req, res) {
    const movie = req.body;
    movie_1.Movie.find({}, { id: 1 }, (err, movies) => {
        movie.id = generateMovieId(movies);
        movie_1.Movie.insertMany([movie], (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            const resId = { id: result[0].id };
            res.json(resId);
        });
    });
});
router.get('/:id', (req, res) => {
    movie_1.Movie.findOne({ id: req.params.id }, { id: 0 }, (err, movie) => {
        if (err) {
            res.status(500).json({ info: 'Error executing query.', error: err });
        }
        if (movie) {
            const movieResult = {
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
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    movie_1.Movie.remove({ id: req.params.id }, err => {
        if (err) {
            res.status(404);
        }
        res.status(200).end();
    });
});
router.put('/:id', (req, res) => {
    const movie = req.body;
    movie_1.Movie.findOneAndUpdate({ id: req.params.id }, movie, { upsert: true }, (err, result) => {
        if (err) {
            res.status(404);
        }
        res.status(200).end();
    });
});
router.get('/find', (req, res) => {
    const year = parseInt(req.query.year, 10);
    const orderBy = req.query.orderby;
    if (orderBy === 'Title' || orderBy === 'Director') {
        const sort = orderBy === 'Title' ? { title: 1 } : { director: 1 };
        movie_1.Movie.find({ year: year }, { _id: 0, __v: 0 }, { sort: orderBy.toLowerCase() }, (err, movies) => {
            if (err) {
                res.status(500).json({ info: 'Error executing query.', error: err });
            }
            ;
            if (movies) {
                const idList = { id: movies.map(m => m.id) };
                res.json(idList);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
});
function generateMovieId(movies) {
    if (!movies.length)
        return 0;
    let id = 0;
    movies.forEach(movie => {
        const currentId = movie.id;
        if (currentId >= id) {
            id = currentId + 1;
        }
    });
    return id;
}
exports.generateMovieId = generateMovieId;
exports.default = router;
//# sourceMappingURL=movie_service.js.map