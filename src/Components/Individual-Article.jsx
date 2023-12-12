import { useParams, Link } from 'react-router-dom';
import { getOneArticle } from '../api/getArticles';
import { useEffect, useState } from 'react';
import Comments from './Comments';
const IndividualArticle = () => {
    const { article_id } = useParams();
    const [ IsLoading, setIsLoading ] = useState(true)
    const [ AnArticle, setAnArticle ] = useState();
    useEffect(() => {
        getOneArticle(article_id)
        .then((article) => {
            setAnArticle(article)
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
        <p>{AnArticle.votes} Votes {AnArticle.comment_count} Comments</p>
        </article>
        <Comments props={AnArticle} />
        </>
    )
};
export default IndividualArticle;