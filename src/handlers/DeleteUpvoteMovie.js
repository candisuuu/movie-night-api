import { headers } from "../helpers/DataHelper";

const DeleteUpvoteMovie = async request => {
    const movieDeletionId = request.query.id;
    const movieNightDataResults = JSON.parse(await movieNightData.get('movies'));

    const deleteUpvotedMovie = (movieId, apiDataResults) => {
        const upvotedMovieMatch = apiDataResults.findIndex(movie => movie.imdbID === movieId);

        if (upvotedMovieMatch !== -1)
            apiDataResults.splice(upvotedMovieMatch, 1);

        return apiDataResults;
    };

    const newMovieNightData = deleteUpvotedMovie(movieDeletionId, movieNightDataResults, "delete");

    const dataBody = JSON.stringify(await movieNightData.put('movies', JSON.stringify(newMovieNightData)));
    return new Response(dataBody, { headers });
};

export default DeleteUpvoteMovie;