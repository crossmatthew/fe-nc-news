import axios from 'axios';
const patchArticlesVotes = (id, amount) => {
    return axios
    .patch(`https://nc-news-js3f.onrender.com/api/articles/${id}`, { inc_votes: amount })
    .then((res) => {
        return res.data.articles
    })
};
export default patchArticlesVotes