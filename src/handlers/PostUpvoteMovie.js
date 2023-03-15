import { headers } from "../helpers/DataHelper";

const PostUpvoteMovie = async request => {
    const upvoteMovieRequestData = await request.json();
    const movieNightDataResults = JSON.parse(await movieNightData.get('movies'));

    const updateUpvotedMovies = (newMovieData, apiDataResults) => {
        const upvotedMovieMatch = apiDataResults.filter(movie => movie.imdbID === newMovieData.imdbID);

        if (upvotedMovieMatch.length) {
            upvotedMovieMatch[0].totalVotes = newMovieData.totalVotes;
        } else
            apiDataResults.push(newMovieData);

        return apiDataResults;
    };

    const newMovieNightData = updateUpvotedMovies(upvoteMovieRequestData, movieNightDataResults);

    const dataBody = JSON.stringify(await movieNightData.put('movies', JSON.stringify(newMovieNightData)));
    return new Response(dataBody, { headers });
};

export default PostUpvoteMovie;