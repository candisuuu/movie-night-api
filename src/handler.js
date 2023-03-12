import { Router } from 'itty-router';
import { headers } from './helpers/DataHelper';
import jwt from '@tsndr/cloudflare-worker-jwt';
import FetchMovies from './handlers/FetchMovies';
import FetchMovieSearch from './handlers/FetchMovieSearch';
import PostUpvoteMovie from './handlers/PostUpvoteMovie';

const router = Router();
const handleError = error => {
    new Response(error.message, { status: error.status || 500 });
}
const verifyAccessToken = async (token) => {
    const isValid = await jwt.verify(token, 'secret');

    if (!isValid)
        return false;
    else
        return true;
}

router
    .get('/api/movies', FetchMovies)
    .get('/api/movie-search', FetchMovieSearch)
    .options('/api/movies', () => new Response('', { status: 200, headers }))
    .options('/api/movie-search', () => new Response('', { status: 200, headers }))
    .post('/api/movies', PostUpvoteMovie)
    .all('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request) => {
    const accessToken = request.headers.get('authorization');

    if (!accessToken)
        handleError({ message: 'Unauthorized', status: 401 });
    else {
        const checkAccessToken = verifyAccessToken(accessToken);

        if (checkAccessToken)
            router.handle(request).catch(handleError);
        else
            handleError({ message: 'Unauthorized', status: 401 });
    }
};