import { useState, useEffect } from "react";
import { getArticles, getArticlesQuery } from "../api/getArticles";
import { Link, useSearchParams } from "react-router-dom";
const Articles = () => {
    const [ Articles, setArticles ] = useState();
    const [ Loading, setLoading ] = useState(true)
    const [ isToggled, setToggle] = useState('desc');
    const [ radioValue, setRadioValue ] = useState('created_at')
    const [ searchParams, setSearchParams ] = useSearchParams();
    useEffect(() => {
        if (searchParams.get('sort_by') && searchParams.get('sort_by').toLowerCase() === 'votes' || searchParams.get('sort_by') && searchParams.get('sort_by').toLowerCase() === 'created_at' || searchParams.get('sort_by') &&  searchParams.get('sort_by').toLowerCase() === 'comment_count') {
            setRadioValue(searchParams.get('sort_by'))
            if (searchParams.get('order') && searchParams.get('order').toLowerCase() === 'asc' || searchParams.get('order') && searchParams.get('order').toLowerCase() === 'desc') {
                setToggle(searchParams.get('order'))
                getArticlesQuery(searchParams.get('sort_by'), searchParams.get('order'))
                .then((articles) => {
                    setSearchParams({sort_by: radioValue, order: isToggled});
                    setArticles(articles)
                    setLoading(false)
                })
            } else {
                getArticlesQuery(searchParams.get('sort_by'), isToggled)
                .then((articles) => {
                    setSearchParams({sort_by: radioValue, order: isToggled});
                    setArticles(articles)
                    setLoading(false)
                })
            }
        } else {
            getArticles()
            .then((articles) => {
                setSearchParams({sort_by: radioValue, order: isToggled});
                setArticles(articles)
                setLoading(false)
            })
        }
    }, [])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const handleToggle = () => {
        const newToggle = isToggled === 'desc' ? 'asc' : 'desc'
        setToggle(newToggle)
        setSearchParams({sort_by: radioValue, order: newToggle})
        if (radioValue === 'created_at') {
            const articleTimeSort = [...Articles].sort((a, b) => {
                return isToggled === 'desc' ? new Date(a[radioValue]).getTime() - new Date(b[radioValue]).getTime() : new Date(b[radioValue]).getTime() - new Date(a[radioValue]).getTime()
            })
            setArticles(articleTimeSort)
        } else {
            const articleSort = [...Articles].sort((a, b) => {
                return isToggled === 'desc' ? a[radioValue] - b[radioValue] : b[radioValue] - a[radioValue]
            })
            setArticles(articleSort)
        }
    };
    const handleOnChange = (e) => {
        setLoading(true);
        if (isToggled) {
            setSearchParams({sort_by: e, order: isToggled})
            getArticlesQuery(e, isToggled)
            .then((articles) => {
                setArticles(articles)
                setRadioValue(e);
                setLoading(false)
            })
        } else {
            setSearchParams({sort_by: radioValue, order: isToggled})
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
                    {isToggled === 'desc' ? 'Descending' : 'Ascending'}
                </button>
            {articlesMap}
        </ul>
        </article>
    );
};
export default Articles;