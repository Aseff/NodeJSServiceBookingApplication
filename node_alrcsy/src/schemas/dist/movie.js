'use_strict';
"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var mongoose = require("mongoose");
var MovieSchema = new mongoose.Schema({
    id: Number,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});
exports.Movie = mongoose.model('Movie', MovieSchema, 'Movies');
