import { headers } from "../helpers/DataHelper";

const FetchMovieSearch = async request => {   
    const queryParams = {
        searchTerm: request.query.s,
        pageNumber: request.query.page
    };
    const fetchOmdbMovieResults = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&s=${queryParams.searchTerm}&page=${queryParams.pageNumber}`);
    const omdbMovieResults = await fetchOmdbMovieResults.json();
    const movieNightDataResults = JSON.parse(await movieNightData.get('movies'));

    const addVotesData = (searchResults, apiDataResults) => {
        searchResults.Search.map(searchResult => {
            const movieResultData = apiDataResults.filter(movie => movie.imdbID === searchResult.imdbID);
            let totalVotes = 0;

            if (movieResultData.length)
                totalVotes = movieResultData[0].totalVotes;

            searchResult.totalVotes = totalVotes;
        });

        return searchResults;
    };

    const dataBody = addVotesData(omdbMovieResults, movieNightDataResults);

    return new Response(JSON.stringify(dataBody), { headers });
};

export default FetchMovieSearch;