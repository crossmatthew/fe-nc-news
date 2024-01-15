import { useState, useEffect } from "react";
import { getArticles } from "../api/getArticles";
import { Link } from "react-router-dom";
const Articles = () => {
    const [ Loading, setLoading ] = useState(true)
    const [ isToggled, setToggle] = useState(true);
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
    const handleToggle = () => {
        setToggle(!isToggled)
    }
    const handleOnChange = (e) => {
        console.log(e)
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
        <article className="container">
        <ul>
                <select defaultValue="new" onChange={(e) => handleOnChange(e.target.value)}>
                <option value="new">New</option>
                <option value="votes">Top</option>
                <option value="comments">Comments</option>
                </select>
                <button onClick={handleToggle}>
                    {isToggled ? 'Desc' : 'Asc'}
                </button>
            {articlesMap}
        </ul>
        </article>
        </>
    );
};
export default Articles;