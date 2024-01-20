import { useState, useEffect } from "react";
import { getArticles, getArticlesByPage, getArticlesQuery } from "../api/getArticles";
import { Link, useSearchParams } from "react-router-dom";
const Articles = () => {
    const [ Articles, setArticles ] = useState();
    const [ Loading, setLoading ] = useState(true)
    const [ isToggled, setToggle] = useState('desc');
    const [ fixedOrder, setFixedOrder ] = useState();
    const [ radioValue, setRadioValue ] = useState('created_at');
    const [ TotalCount, setTotalCount ] = useState();
    const [ Limit, setLimit ] = useState(10);
    const [ Page, setPage ] = useState(0);
    const [ searchParams, setSearchParams ] = useSearchParams();
    useEffect(() => {
        if (searchParams.get('sort_by') && searchParams.get('sort_by').toLowerCase() === 'votes' || searchParams.get('sort_by') && searchParams.get('sort_by').toLowerCase() === 'created_at' || searchParams.get('sort_by') &&  searchParams.get('sort_by').toLowerCase() === 'comment_count') {
            setRadioValue(searchParams.get('sort_by'))
            if (searchParams.get('order') && searchParams.get('order').toLowerCase() === 'asc' || searchParams.get('order') && searchParams.get('order').toLowerCase() === 'desc') {
                setFixedOrder(searchParams.get('order'))
                setToggle(searchParams.get('order'))
                getArticlesQuery(searchParams.get('sort_by'), searchParams.get('order'), Limit)
                .then((articles) => {
                  setTotalCount(articles[0].total_count)
                  setSearchParams({sort_by: radioValue, order: isToggled, limit: Limit});
                  setArticles(articles)
                  setLoading(false)
                })
            } else {
                getArticlesQuery(searchParams.get('sort_by'), isToggled, Limit)
                .then((articles) => {
                  setTotalCount(articles[0].total_count)
                  setSearchParams({sort_by: radioValue, order: isToggled, limit: Limit});
                  setArticles(articles)
                  setLoading(false)
              })
            }
        } else {
            setFixedOrder(isToggled)
            getArticles()
            .then((articles) => {
              setTotalCount(articles[0].total_count);
                setSearchParams({sort_by: radioValue, order: isToggled, limit: Limit});
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
        setSearchParams({sort_by: radioValue, order: newToggle, limit: Limit})
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
        setFixedOrder(isToggled)
        if (isToggled) {
            setSearchParams({sort_by: e, order: isToggled, limit: Limit})
            getArticlesQuery(e, isToggled, Limit)
            .then((articles) => {
              setTotalCount(articles[0].total_count);
                setArticles(articles)
                setRadioValue(e);
                setLoading(false)
            })
        } else {
            setSearchParams({sort_by: radioValue, order: isToggled, limit: Limit})
            getArticlesQuery(e, isToggled, Limit)
            .then((articles) => {
              setTotalCount(articles[0].total_count);
                setArticles(articles)
                setRadioValue(e);
                setLoading(false) 
            })
        }
    };         
    const articlesMap = Articles.map((article) => {
        const articleLink = `/${article.article_id}`
        return  <li className='container' key={article.article_id}>
            <p hidden>{article.total_count}</p>
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
    const handlePagination = () => {
        getArticlesByPage(radioValue, fixedOrder, 1, Limit)
        .then((articles) => {
          setTotalCount(articles[0].total_count);
          setArticles(articles)

          /*  first page of results is 0
          total_count / limit = Math.ceil(pages)
          eg 37 / 10 = (3.7) 4 pages
          so I need to render 4 buttons...
              limit 10, 20, whatever
              previous page = only renders if current page is > 0, and is current page - 1
              next page
              current page =
              */
        })
    }
    const handleLimit = (e) => {
      setLimit(e.target.value)
                    setSearchParams({
                      sort_by: radioValue,
                      order: isToggled,
                      limit: e.target.value,
                    });
        getArticlesByPage(radioValue, fixedOrder, 0, e.target.value)
      .then((articles) => {
        setArticles(articles)
        setTotalCount(articles[0].total_count)
      })
    };
    return (
      <article className="container">
        <ul>
          <label>
            New
            <input
              type="radio"
              defaultChecked={radioValue === "created_at"}
              name="radio-button"
              value="created_at"
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </label>
          <label>
            Top
            <input
              type="radio"
              defaultChecked={radioValue === "votes"}
              name="radio-button"
              value="votes"
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </label>
          <label>
            Comments
            <input
              type="radio"
              defaultChecked={radioValue === "comment_count"}
              name="radio-button"
              value="comment_count"
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </label>
          <button onClick={handleToggle}>
            {isToggled === "desc" ? "Descending" : "Ascending"}
          </button>
          <label>
            Limit
            <select
              onChange={handleLimit}
              hidden={TotalCount < 5}
              name="articlesLimit"
              defaultValue={
                searchParams.get("limit") ? searchParams.get("limit") : 10
              }
            >
              <option value={5}>5</option>
              <option hidden={TotalCount < 10} value={10}>10</option>
              <option hidden={TotalCount < 20} value={20}>20</option>
              <option value={TotalCount}>{TotalCount} (All)</option>
            </select>
          </label>
          <button>Prev</button>
          <button>1</button>
          <button onClick={handlePagination}>2</button>
          {articlesMap}
        </ul>
      </article>
    );
};
export default Articles;