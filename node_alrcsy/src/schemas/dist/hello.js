'use_strict';
"use strict";
exports.__esModule = true;
exports.Hello = void 0;
var mongoose = require("mongoose");
var HelloSchema = new mongoose.Schema({
    name: String,
    message: String
});
exports.Hello = mongoose.model('Hello', HelloSchema, 'Hello');
