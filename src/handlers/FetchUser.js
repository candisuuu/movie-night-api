import { headers } from "../helpers/DataHelper";

export const addNewUser = async (userList, userObj) => {
    userList.push(userObj);
    await movieNightData.put('users', JSON.stringify(userList));
    return;
};

const FetchUser = async request => {
    const userId = request.params.id;
    const userList = JSON.parse(await movieNightData.get('users'));

    const fetchUserData = (id, list) => {
        const filterUserData = list.filter(user => user.UserName === id);

        if (filterUserData.length)
            return filterUserData[0];
        else {
            const newUser = {
                UserName: id,
                UpvotedMovies: []
            };
            addNewUser(list, newUser);
            return newUser;
        }
    }

    const dataBody = JSON.stringify(fetchUserData(userId, userList));

    return new Response(dataBody, { headers });
};

export default FetchUser;