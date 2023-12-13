import { useContext } from "react";
import { UserContext } from "../Contexts/User-Context";
import postComments from "../api/postComments";
const AddComment = (props) => {
    const { id } = props
    const { User } = useContext(UserContext);
    const handleSubmit = (event) => {
        event.preventDefault()
        const comment = event.target[0].value
        postComments(id, User, comment)
        event.target.reset()
    }
    if (User) {
        return (
            <section>
                <form className="container" id="add-comment" onSubmit={handleSubmit}>
                    <p>Logged in as: {User}</p>
                    <input type="text" placeholder="Share Your Thoughts" id="text-entry"></input>
                    <input type="submit" value="Comment"></input>
                </form>
            </section>
        )
    }
    return (
        null
    )
};
export default AddComment;