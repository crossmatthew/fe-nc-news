import axios, { AxiosError } from 'axios';
const getTopics = () => {
    return axios
    .get('https://nc-news-js3f.onrender.com/api/topics')
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.topics
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
export default getTopics;