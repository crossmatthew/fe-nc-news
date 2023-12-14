import axios from 'axios';
const deleteComment = (commentId) => {
    return axios
    .delete(`https://nc-news-js3f.onrender.com/api/comments/${commentId}`)
      .catch(error => {
        console.error(error);
      });
};
export default deleteComment;