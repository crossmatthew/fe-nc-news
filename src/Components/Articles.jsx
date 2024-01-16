import { useState, useEffect } from "react";
import { getArticles, getArticlesQuery } from "../api/getArticles";
import { Link } from "react-router-dom";
const Articles = () => {
    const [ Articles, setArticles ] = useState();
    const [ Loading, setLoading ] = useState(true)
    const [ isToggled, setToggle] = useState(true);
    const [ radioValue, setRadioValue ] = useState('created_at')
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
    };
    const handleOnChange = (e) => {
        setLoading(true);
        if (isToggled) {
            getArticlesQuery(e, isToggled)
            .then((articles) => {
                console.log(articles)
                setArticles(articles)
                setRadioValue(e);
                setLoading(false)
            })
        } else {
            getArticlesQuery(e, isToggled)
            .then((articles) => {
                setArticles(articles)
                setRadioValue(e);
                setLoading(false) 
            })
        }
    };
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
        <article className="container">
        <ul>
                <label>New
                    <input type="radio" defaultChecked={radioValue === 'created_at'} name="radio-button" value="created_at" onChange={(e) => handleOnChange(e.target.value)}/>
                    </label>
                <label>
                    Top
                    <input type="radio" defaultChecked={radioValue === 'votes'} name="radio-button" value="votes" onChange={(e) => handleOnChange(e.target.value)}/>
                    </label>
                    <label>
                        Comments
                <input type="radio" defaultChecked={radioValue === 'comment_count'} name="radio-button" value="comment_count" onChange={(e) => handleOnChange(e.target.value)}/>
                    </label>
                <button onClick={handleToggle}>
                    {isToggled ? 'Desc' : 'Asc'}
                </button>
            {articlesMap}
        </ul>
        </article>
    );
};
export default Articles;