import { useContext, useState } from "react";
import { UserContext } from "../Contexts/User-Context";
import postComments from "../api/postComments";
const AddComment = (props) => {
    const [ CommentStatus, setCommentStatus ] = useState();
    const [ postingComment, setPostingComment ] = useState();
    const { id } = props
    const { User } = useContext(UserContext);
    const handleSubmit = (event) => {
        event.preventDefault()
        setPostingComment(true)
        setCommentStatus('Posting Comment')
        const comment = event.target[0].value
        postComments(id, User, comment)
        .then((res) => {
            if (res.status === 201) {
                setPostingComment(false)
                setCommentStatus('Comment Posted Successfully')
                setTimeout(() => {
                    setCommentStatus(null)
                }, 1000)
            }
        })
        .catch(err => {
            setCommentStatus(err);
        });
        event.target.reset()
    }
    if (User) {
        return (
            <section>
                <form className="container" id="add-comment" onSubmit={handleSubmit}>
                    <p>Logged in as: {User}</p>
                    <input type="text" placeholder="Share Your Thoughts" id="text-entry" required={true} minLength={1}></input>
                    <input type="submit" value="Comment" disabled={postingComment}></input>
                    <p>{CommentStatus}</p>
                </form>
            </section>
        )
    }
    return (
        null
    )
};
export default AddComment;