import { MovieEntity } from '../schemas/movie';

export function generateId(movies: Array<MovieEntity>) {
    if (!movies.length) return 0;

    let id: number = 0;
    movies.forEach(movie => {
        const currentId: number = movie.id;
        if (currentId >= id) {
            id = currentId + 1;
        }
    });
    return id;
}
