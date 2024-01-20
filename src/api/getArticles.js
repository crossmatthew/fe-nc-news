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
const getArticlesByTopic = (topic, sortBy, order) => {
    return axios
        .get(`https://nc-news-js3f.onrender.com/api/articles?topic=${topic}&sort_by=${sortBy}&order=${order}`)
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
const getArticlesQuery = (query, order, limit) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles?sort_by=${query}&order=${order}&limit=${limit}`)
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
const getArticlesByPage = (query, order, page, limit) => {
    return axios
    .get(`https://nc-news-js3f.onrender.com/api/articles?sort_by=${query}&order=${order}&p=${page}&limit=${limit}`)
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
export { getArticles, getOneArticle, getArticlesByTopic, getArticlesQuery, getArticlesByPage }