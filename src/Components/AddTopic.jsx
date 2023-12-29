import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/User-Context";
import postTopic from "../api/postTopic";
const AddTopic = (props) => {
    const [ Connection, setConnection ] = useState(navigator.onLine);
    const [ TopicStatus, setTopicStatus ] = useState();
    const [ postingTopic, setPostingTopic ] = useState();
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
        setPostingTopic(true)
        setTopicStatus('Posting Topic')
        const topicName = event.target[0].value
        const topicDescription = event.target[1].value
        postTopic(topicName, topicDescription)
        .then((res) => {
            if (res.status === 201) {
                setPostingTopic(false)
                setTopicStatus('Topic Posted Successfully')
                setTimeout(() => {
                    setTopicStatus(null)
                }, 1000)
            }
        })
        .catch(err => {
            setTopicStatus(`${err.message}. Please Refresh Page`)
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
                <form className="container" id="add-topic" onSubmit={handleSubmit}>
                <h2>Add a New Topic</h2>
                    <p>Logged in as: {User}</p>
                    <input type="text" name="TOPICS" placeholder="Topic Name" id="text-entry" required={true} minLength={1}/>
                    <input type="text" name="TOPICS" placeholder="Description" id="text-entry" required={true} minLength={1}/>
                    <input type="submit" value="Post Topic" disabled={postingTopic}/>
                    <p>{TopicStatus}</p>
                </form>
            </section>
        )}
    return (
        null
    )
};
export default AddTopic;