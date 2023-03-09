import { headers } from "../helpers/DataHelper";

const PostUpvoteMovie = async request => {
    const upvoteMovieRequestData = await request.json();
    const movieNightDataResults = JSON.parse(await movieNightData.get('movies'));
    const userList = JSON.parse(await movieNightData.get('users'));

    const updateUpvotedMovies = (newMovieData, apiDataResults) => {
        const upvotedMovieMatch = apiDataResults.filter(movie => movie.imdbID === newMovieData.imdbID);

        delete upvoteMovieRequestData['userName'];

        if (upvotedMovieMatch.length) {
            upvotedMovieMatch[0].totalVotes += 1;
        } else
            apiDataResults.push(newMovieData);

        return apiDataResults;
    };

    const userMatch = userList.filter(user => user.UserName === upvoteMovieRequestData.userName);
    if (userMatch.length)
        userMatch[0].UpvotedMovies.push(upvoteMovieRequestData.imdbID);

    await movieNightData.put('users', JSON.stringify(userList));

    const newMovieNightData = updateUpvotedMovies(upvoteMovieRequestData, movieNightDataResults);

    const dataBody = JSON.stringify(await movieNightData.put('movies', JSON.stringify(newMovieNightData)));
    return new Response(dataBody, { headers });
};

export default PostUpvoteMovie;