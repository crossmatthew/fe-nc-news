import axios from 'axios';
const postTopic = (topicName, topicDescription) => {
    return axios
    .post(`https://nc-news-js3f.onrender.com/api/topics`, { slug: topicName, description: topicDescription })
};
export default postTopic