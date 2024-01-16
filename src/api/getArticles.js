import axios from 'axios';
const getArticles = () => {
    return axios
    .get('https://nc-news-js3f.onrender.com/api/articles')
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.articles
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
const getArticlesByTopic = (topic) => {
    return axios
        .get(`https://nc-news-js3f.onrender.com/api/articles?topic=${topic}`)
        .then((res) => {
            if (res.status !== 200) {
                return Promise.reject({ status:res.status, message: res.statusText })
            }
            return res.data.articles
        })
        .catch((err) => {
            return Promise.reject({status: err.response.status, msg: err.response.data.msg})
        })
};
const getOneArticle = (id) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles/${id}`)
    .then((res) => {    
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.article
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
const getArticlesQuery = (query, order) => {
    order ? order = 'desc' : order = 'asc'
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles?sort_by=${query}&order=${order}`)
    .then((res) => {
        if (res.status !== 200) {
            return Promise.reject({ status:res.status, message: res.statusText })
        }
        return res.data.articles
    })
    .catch((err) => {
        return Promise.reject({status: err.response.status, msg: err.response.data.msg})
    })
};
export { getArticles, getOneArticle, getArticlesByTopic, getArticlesQuery }