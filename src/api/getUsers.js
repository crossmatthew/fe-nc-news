import axios from 'axios';
const getUsers = () => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/users`)
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.users
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
const getOneUser = (username) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/users/${username}`)
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.user
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
export { getUsers, getOneUser };