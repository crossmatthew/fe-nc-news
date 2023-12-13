import { useParams, Link } from 'react-router-dom';
import { getOneArticle } from '../api/getArticles';
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { ArticleVotePlus, ArticleVoteMinus } from "./ArticleVotes";
const IndividualArticle = () => {
    const { article_id } = useParams();
    const [ IsLoading, setIsLoading ] = useState(true)
    const [ AnArticle, setAnArticle ] = useState();
    const [ ArticleVotes, setArticleVotes ] = useState();
    const [ err, setErr ] = useState(null);
    useEffect(() => {
        getOneArticle(article_id)
        .then((article) => {
            setAnArticle(article)
            setArticleVotes(article.votes)
            setIsLoading(false)
        })
    }, [])
    if (IsLoading) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <>
        <article className='container'>
        <p>{AnArticle.topic} {AnArticle.created_at}</p>
        <Link to={`/users/${AnArticle.author}`}><p>{AnArticle.author}</p></Link>
        <h1>{AnArticle.title}</h1>
        <img src={AnArticle.article_img_url}/>
        <p>{AnArticle.body}</p>
        <p><ArticleVotePlus articleId={AnArticle.article_id} setVotes={setArticleVotes} setErr={setErr}/> {ArticleVotes} Votes {err} <ArticleVoteMinus articleId={AnArticle.article_id} setVotes={setArticleVotes} setErr={setErr}/> {AnArticle.comment_count} Comments</p>
        </article>
        <Comments props={AnArticle} />
        </>
    )
};
export default IndividualArticle;