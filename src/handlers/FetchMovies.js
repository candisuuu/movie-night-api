import { headers, sortData } from "../helpers/DataHelper";

const FetchMovies = async request => {
    const movieList = JSON.parse(await movieNightData.get('movies'));
    let dataBody = JSON.stringify(movieList);

    if (request.query.sortBy)
        dataBody = JSON.stringify(sortData(movieList, request.query.sortBy, request.query.sortOrder));

    return new Response(dataBody, { headers });
};

export default FetchMovies;