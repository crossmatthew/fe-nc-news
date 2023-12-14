import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/User-Context";
import postComments from "../api/postComments";
const AddComment = (props) => {
    const [ Connection, setConnection ] = useState(navigator.onLine);
    const [ CommentStatus, setCommentStatus ] = useState();
    const [ postingComment, setPostingComment ] = useState();
    const { id } = props
    const { User } = useContext(UserContext);
    const checkConnection = () => {
        setConnection(navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener('online', checkConnection);
        window.addEventListener('offline', checkConnection);
        return () => {
            window.removeEventListener('online', checkConnection);
            window.removeEventListener('offline', checkConnection);
        };
    }, []);
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
            setCommentStatus(`${err.message}. Please Refresh Page`)
        });
        event.target.reset()
    }
    if (User) {
        if (!Connection) {
            return (
                <p className="container">You are currently offline. Check your connection and try again...</p>
            )}
        return (
            <section>
                <form className="container" id="add-comment" onSubmit={handleSubmit}>
                    <p>Logged in as: {User}</p>
                    <input type="text" name="COMMENTS" placeholder="Share Your Thoughts" id="text-entry" required={true} minLength={1}/>
                    <input type="submit" value="Comment" disabled={postingComment}/>
                    <p>{CommentStatus}</p>
                </form>
            </section>
        )}
    return (
        null
    )
};
export default AddComment;