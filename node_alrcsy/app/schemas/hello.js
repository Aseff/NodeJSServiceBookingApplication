'use_strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
const mongoose = require("mongoose");
let HelloSchema = new mongoose.Schema({
    name: String,
    message: String
});
exports.Hello = mongoose.model('Hello', HelloSchema, 'Hello');
//# sourceMappingURL=hello.js.map