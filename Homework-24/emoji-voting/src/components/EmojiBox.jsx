function EmojiBox({ emoji, votes, onVote }) {
  return (
    <div className="emoji-item">
      <button 
        className="emoji-button" 
        onClick={onVote}
      >
        {emoji}
      </button>
      
      <div className="vote-count">
        {votes}
      </div>
    </div>
  );
}

export default EmojiBox;