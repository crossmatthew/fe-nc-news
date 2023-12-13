import axios from 'axios';
const postComments = (id, author, comment) => {
    return axios
    .post(`https://nc-news-js3f.onrender.com/api/articles/${id}/comments`, { username: author, body: comment })
};
export default postComments