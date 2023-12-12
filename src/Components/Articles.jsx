import { useState, useEffect } from "react";
import { getArticles } from "../api/getArticles";
import { Link } from "react-router-dom";
const Articles = () => {
    const [ Loading, setLoading ] = useState(true)
    const [ Articles, setArticles ] = useState();
    useEffect(() => {
        getArticles()
        .then((articles) => {
            setArticles(articles)
            setLoading(false)
        })
    }, [])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const articlesMap = Articles.map((article) => {
        const articleLink = `/${article.article_id}`
        return <Link to={articleLink}>
            <li className='each-article' key={article.article_id}>
            <p id='article-topic-date'>{article.topic} {article.created_at}</p>
            <h3 id='article-title'>{article.title}</h3>
            <img className='article-img' src={article.article_img_url}/>
            <p id='article-votes-comments'>{article.votes} Votes {article.comment_count} Comments</p>
        </li></Link>
    })
    return (
        <>
        <article>
        <ul>
            {articlesMap}
        </ul>
        </article>
        </>
    );
};
export default Articles;