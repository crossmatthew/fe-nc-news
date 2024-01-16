import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticlesByTopic } from '../api/getArticles';
import { Link } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";
function TopicArticles() {
    const { topic } = useParams();
    const [ Error, setError ] = useState();
    const [ Loading, setLoading ] = useState(true)
    const [ Articles, setArticles ] = useState();
    useEffect(() => {
        getArticlesByTopic(topic)
        .then((articles) => {
            setArticles(articles)
            setLoading(false)
        })
        .catch((err) => {
            setError({ err })
        })
    }, [])
    if (Error) {
        return <ErrorHandler error={Error}/>
    }
    if (Loading) {
        return <h1>Loading</h1> 
    }
    const articlesMap = Articles.map((article) => {
        const articleLink = `/${article.article_id}`
        return  <li className='container' key={article.article_id}>
                <Link to={`/topics/${article.topic}`}>
                <p id='article-topic-date'>{article.topic} • {new Date(article.created_at).toDateString()}</p>
            </Link>
            <Link to={articleLink}>
                <h3 id='article-title'>{article.title}</h3>
                <img src={article.article_img_url}/>
                <p id='article-votes-comments'>{article.votes} Votes {article.comment_count} Comments</p>
            </Link>
            </li>
    })
    return (
        <>
        <article>
        <ul>
            {articlesMap.length > 0 ? articlesMap : <p>No Articles to Show. Why not add one?</p>}
        </ul>
        </article>
        </>
    );
};

export default TopicArticles;