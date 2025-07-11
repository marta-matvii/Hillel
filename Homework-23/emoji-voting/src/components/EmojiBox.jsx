import { Component } from 'react';

class EmojiBox extends Component {
  render() {
    const { emoji, votes, onVote } = this.props;
    
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
}

export default EmojiBox;