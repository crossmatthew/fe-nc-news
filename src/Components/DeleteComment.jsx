import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
import deleteComment from "../api/deleteComment";
const DeleteComment = (props) => {
    const { id, DeletedComment } = props;
    const { User } = useContext(UserContext);
    const [ Connection, setConnection ] = useState(navigator.onLine);
    const [ CommentStatus, setCommentStatus ] = useState();
    const [ DeletingComment, setDeletingComment ] = useState();
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
    const handleDelete = (event) => {
        event.preventDefault()
        setDeletingComment(true)
        setCommentStatus('Deleting Comment')
        deleteComment(id)
        .then((res) => {
            if (res.status === 204) {
                setCommentStatus(null)
            }
        })
        .catch(error => {
            setCommentStatus(`Error Occurred Please Refresh Page`)
        });
    }
        return (
            <>
            <p>{CommentStatus}</p>
           {Connection ? <button type="submit" name="DELETE" disabled={DeletingComment} onClick={handleDelete}>Delete Comment</button> : <><button disabled={1}>Delete Comment</button><p>Deleting Disabled While Offline</p></>}
            </>
        )
}
export default DeleteComment;