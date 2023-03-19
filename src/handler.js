import { Router } from 'itty-router';
import { headers } from './helpers/DataHelper';
import FetchMovies from './handlers/FetchMovies';
import FetchMovieSearch from './handlers/FetchMovieSearch';
import PostUpvoteMovie from './handlers/PostUpvoteMovie';
import DeleteUpvoteMovie from './handlers/DeleteUpvoteMovie';

const router = Router();
const handleError = error => {
    new Response(error.message || 'Server error', { status: error.status || 500 });
}

router
    .get('/api/movies', FetchMovies)
    .get('/api/movie-search', FetchMovieSearch)
    .post('/api/movies', PostUpvoteMovie)
    .delete('/api/movies', DeleteUpvoteMovie)
    .options('/api/movies', () => new Response('', { status: 200, headers }))
    .options('/api/movie-search', () => new Response('', { status: 200, headers }))
    .all('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = request => router.handle(request).catch(handleError);