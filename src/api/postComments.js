import axios from 'axios';
const postComments = (id, comment) => {
    return axios
    .post(`https://nc-news-js3f.onrender.com/api/articles/${id}/comments`, { body: comment })
};
export default postComments