import patchArticlesVotes from '../api/patchArticlesVotes';
const handleVote = (symbol, id, setVotes, setErr) => {
    let amount = 0
    const plusOrMinus = symbol === '+' ? amount = 1 : amount = -1
    setVotes((currVal) => currVal += amount)
    setErr(null)
    patchArticlesVotes(id, amount).catch((error => {
        setVotes((currentCount) => currentCount += -amount);
        setErr('Failed. Please Try Again.');
    }))
    }
const ArticleVotePlus = ({ articleId, setVotes, setErr }) => {
    return (
        <button onClick={() => handleVote('+', articleId, setVotes, setErr)}>+</button>
    )
};
const ArticleVoteMinus = ({ articleId, setVotes, setErr }) => {
    return (
        <button onClick={() => handleVote('-', articleId, setVotes, setErr)}>-</button>
    )
};
export { ArticleVotePlus, ArticleVoteMinus };