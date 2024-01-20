import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getArticlesByTopic } from '../api/getArticles';
import { Link, useSearchParams } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";
function TopicArticles() {
    const { topic } = useParams();
    const [ Error, setError ] = useState();
    const [ Loading, setLoading ] = useState(true)
    const [ Articles, setArticles ] = useState();
    const [isToggled, setToggle] = useState("desc");
    const [fixedOrder, setFixedOrder] = useState();
    const [radioValue, setRadioValue] = useState("created_at");
    const [TotalCount, setTotalCount] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        getArticlesByTopic(topic, radioValue, isToggled)
        .then((articles) => {
            setTotalCount(articles[0].total_count);
            setSearchParams({sort_by: radioValue, order: isToggled})
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
        const handleToggle = () => {
          const newToggle = isToggled === "desc" ? "asc" : "desc";
          setToggle(newToggle);
          setSearchParams({ sort_by: radioValue, order: newToggle });
          if (radioValue === "created_at") {
            const articleTimeSort = [...Articles].sort((a, b) => {
              return isToggled === "desc"
                ? new Date(a[radioValue]).getTime() -
                    new Date(b[radioValue]).getTime()
                : new Date(b[radioValue]).getTime() -
                    new Date(a[radioValue]).getTime();
            });
            setArticles(articleTimeSort);
          } else {
            const articleSort = [...Articles].sort((a, b) => {
              return isToggled === "desc"
                ? a[radioValue] - b[radioValue]
                : b[radioValue] - a[radioValue];
            });
            setArticles(articleSort);
          }
        };
            const handleOnChange = (e) => {
              setLoading(true);
              setFixedOrder(isToggled);
              if (isToggled) {
                setSearchParams({ sort_by: e, order: isToggled });
                getArticlesByTopic(topic, e, isToggled).then((articles) => {
                    setTotalCount(articles[0].total_count);
                  setArticles(articles);
                  setRadioValue(e);
                  setLoading(false);
                });
              } else {
                setSearchParams({ sort_by: radioValue, order: isToggled });
                getArticlesByTopic(topic, e, isToggled).then((articles) => {
                    setTotalCount(articles[0].total_count);
                  setArticles(articles);
                  setRadioValue(e);
                  setLoading(false);
                });
              }
            };       
    const articlesMap = Articles.map((article) => {
        const articleLink = `/${article.article_id}`
        return (
            <li className="container" key={article.article_id}>
              <p hidden>{article.total_count}</p>
            <Link to={`/topics/${article.topic}`}>
              <p id="article-topic-date">
                {article.topic} • {new Date(article.created_at).toDateString()}
              </p>
            </Link>
            <Link to={articleLink}>
              <h3 id="article-title">{article.title}</h3>
              <img src={article.article_img_url} />
              <p id="article-votes-comments">
                {article.votes} Votes {article.comment_count} Comments
              </p>
            </Link>
          </li>
        );
    })
    return (
      <>
        <article>
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
                hidden={TotalCount < 5} name="articlesLimit"
                defaultValue={
                  searchParams.get("limit") ? searchParams.get("limit") : 10
                }
              >
                <option value={5}>5</option>
                <option hidden={TotalCount < 10} value={10}>
                  10
                </option>
                <option hidden={TotalCount < 20} value={20}>
                  20
                </option>
                <option value={TotalCount}>{TotalCount} (All)</option>
              </select>
            </label>
            {articlesMap.length > 0 ? (
              articlesMap
            ) : (
              <p>No Articles to Show. Why not add one?</p>
            )}
          </ul>
        </article>
      </>
    );
};

export default TopicArticles;