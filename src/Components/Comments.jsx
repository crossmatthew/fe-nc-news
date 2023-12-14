import { useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../Contexts/User-Context";
import getComments from "../api/getComments";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
const Comments = ({ props }) => {
    const { User } = useContext(UserContext)
    const { article_id } = props
    const [ Loading, setLoading ] = useState(true)
    const [ Comments, setComments ] = useState();
    useEffect(() => {
        getComments(article_id)
        .then((comments) => {
            setComments(comments)
            setLoading(false)
        })
        .catch(err => {
        });
    }, [Comments])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const commentMap = Comments.map((comment) => {
        return <li className="container" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}><p>{comment.author}</p></Link>
            <p>{new Date(comment.created_at).toDateString()}</p>
            <p>{comment.body}</p>
            <p>{comment.votes} Votes</p>
            {User === comment.author ? <DeleteComment id={comment.comment_id}/> : null}
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