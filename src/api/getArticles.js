import axios from 'axios';
const getArticles = () => {
    return axios
    .get('https://nc-news-js3f.onrender.com/api/articles')
    .then((res) => {
        return res.data.articles
    })
};
export default getArticles;