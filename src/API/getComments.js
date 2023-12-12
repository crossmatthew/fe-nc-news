import axios from 'axios';
const getComments = (id) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles/${id}/comments`)
    .then((res) => {
        return res.data.comments
    })
};
export default getComments;