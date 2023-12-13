import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import getComments from "../api/getComments";
import AddComment from "./AddComment";
const Comments = ({ props }) => {
    const { article_id } = props
    const [ Loading, setLoading ] = useState(true)
    const [ Comments, setComments ] = useState();
    useEffect(() => {
        getComments(article_id)
        .then((comments) => {
            setComments(comments)
            setLoading(false)
        })
    }, [Comments])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const commentMap = Comments.map((comment) => {
        return <li className="container" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}><p>{comment.author}</p></Link>
            <p>{comment.created_at}</p>
            <p>{comment.body}</p>
            <p>{comment.votes} Votes</p>
        </li>
    })
    return (
        <>
        <section>
            <ul>
                <li><AddComment id={article_id}/></li>
                {commentMap}
            </ul>
        </section>
        </>
    )
};
export default Comments;