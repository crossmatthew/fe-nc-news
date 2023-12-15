import patchArticlesVotes from '../api/patchArticlesVotes';
const handleVote = (symbol, id, setVotes, setVoteErr) => {
    let amount = 0
    const plusOrMinus = symbol === '+' ? amount = 1 : amount = -1
    setVotes((currVal) => currVal += amount)
    setVoteErr(null)
    patchArticlesVotes(id, amount).catch((error => {
        setVotes((currentCount) => currentCount += -amount);
        setVoteErr('Failed. Please Try Again.');
    }))
    }
const ArticleVotePlus = ({ articleId, setVotes, setVoteErr }) => {
    return (
        <button onClick={() => handleVote('+', articleId, setVotes, setVoteErr)}>+</button>
    )
};
const ArticleVoteMinus = ({ articleId, setVotes, setVoteErr }) => {
    return (
        <button onClick={() => handleVote('-', articleId, setVotes, setVoteErr)}>-</button>
    )
};
export { ArticleVotePlus, ArticleVoteMinus };