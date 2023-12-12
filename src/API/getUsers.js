import axios from 'axios';
const getUsers = () => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/users`)
    .then((res) => {
        return res.data.users
    })
};
const getOneUser = (username) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/users/${username}`)
    .then((res) => {
        return res.data.user
    })
};
export { getUsers, getOneUser };