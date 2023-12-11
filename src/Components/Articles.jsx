import { useState, useEffect } from "react";
import getArticles from "../api/getArticles";
const Articles = () => {
    const [ Loading, setLoading ] = useState(true)
    const [ Articles, setArticles ] = useState();
    useEffect(() => {
        getArticles()
        .then((data) => {
            setArticles(data)
            setLoading(false)
        })
    }, [Articles])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const articlesMap = Articles.map((article) => {
        return <li id='each-article' key={article.article_id}>
            <p id='article-topic-date'>{article.topic} {article.created_at}</p>
            <h3 id='article-title'>{article.title}</h3>
            <img id='article-img' src={article.article_img_url}/>
            <p id='article-votes-comments'>{article.votes} Votes {article.comment_count} Comments</p>
        </li>
    })
    return (
        <>
        <section>
        <ul>
            {articlesMap}
        </ul>
        </section>
        </>
    );
};
export default Articles;