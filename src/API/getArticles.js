import axios from 'axios';
const getArticles = () => {
    return axios
    .get('https://nc-news-js3f.onrender.com/api/articles')
    .then((res) => {
        return res.data.articles
    })
};
const getOneArticle = (id) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles/${id}`)
    .then((res) => {
        return res.data.article
    })
};
export { getArticles, getOneArticle }