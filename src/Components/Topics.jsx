import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getTopics from "../api/getTopics";
import AddTopic from "./AddTopic";
const Topics = () => {
    const [ Loading, setLoading ] = useState(true)
    const [ topics, setTopics ] = useState();
    useEffect(() => {
        getTopics()
        .then((topics) => {
            setTopics(topics)
            setLoading(false)
        })
    }, [topics])
    if (Loading) {
        return <h1>Loading</h1>
    }
    const topicsMap = topics.map((topic) => {
        const topicLink = `/topics/${topic.slug}`
        return  <li className='container' key={topic.slug}>
            <Link to={topicLink}>
                <h3 id='topic-title'>{topic.slug}</h3>
            </Link>
                <p>{topic.description}</p>
            </li>
    })
    return (
        <>
        <ul>
            <AddTopic/>
            {topicsMap}
        </ul>
        </>
    );
};
export default Topics;