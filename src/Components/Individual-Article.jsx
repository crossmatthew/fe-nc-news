import { useParams, Link } from 'react-router-dom';
import { getOneArticle } from '../api/getArticles';
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { ArticleVotePlus, ArticleVoteMinus } from "./ArticleVotes";
import ErrorHandler from './ErrorHandler';
const IndividualArticle = () => {
    const { article_id } = useParams();
    const [ Error, setError ] = useState();
    const [ IsLoading, setIsLoading ] = useState(true)
    const [ AnArticle, setAnArticle ] = useState();
    const [ ArticleVotes, setArticleVotes ] = useState();
    const [ VoteErr, setVoteErr ] = useState(null);
    useEffect(() => {
        getOneArticle(article_id)
        .then((article) => {
            setAnArticle(article)
            setArticleVotes(article.votes)
            setIsLoading(false)
        })
        .catch((err) => {
            setError({ err })
        })
    }, [])
    if (Error) {
        return <ErrorHandler error={Error}/>
    }
    if (IsLoading) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <>
        <article className='container'>
        <Link to={`/topics/${AnArticle.topic}`}>
        <p>{AnArticle.topic} • {new Date(AnArticle.created_at).toDateString()}</p>
        </Link>
        <Link to={`/users/${AnArticle.author}`}><p>{AnArticle.author}</p></Link>
        <h1>{AnArticle.title}</h1>
        <img src={AnArticle.article_img_url}/>
        <p>{AnArticle.body}</p>
        <p><ArticleVotePlus articleId={AnArticle.article_id} setVotes={setArticleVotes} setVoteErr={setVoteErr}/> {ArticleVotes} Votes {VoteErr} <ArticleVoteMinus articleId={AnArticle.article_id} setVotes={setArticleVotes} setVoteErr={setVoteErr}/> {AnArticle.comment_count} Comments</p>
        </article>
        <Comments props={AnArticle} />
        </>
    )
};
export default IndividualArticle;