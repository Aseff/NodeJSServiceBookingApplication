"use strict";
exports.__esModule = true;
exports.generateId = void 0;
function generateId(movies) {
    if (!movies.length)
        return 0;
    var id = 0;
    movies.forEach(function (movie) {
        var currentId = movie.id;
        if (currentId >= id) {
            id = currentId + 1;
        }
    });
    return id;
}
exports.generateId = generateId;
