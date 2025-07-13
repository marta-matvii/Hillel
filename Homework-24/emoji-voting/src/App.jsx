import { useState, useEffect } from 'react';
import './App.css'

import Header from './components/Header'
import EmojiBox from './components/EmojiBox'
import BtnShowResult from './components/BtnShowResult'
import BtnResetResult from './components/BtnResetResult'
import Winner from './components/Winner'

function App() {
  const defaultEmojis = [
    { id: 1, emoji: '🪼', votes: 0 },
    { id: 2, emoji: '🪲', votes: 0 },
    { id: 3, emoji: '⛱️', votes: 0 },
    { id: 4, emoji: '🪩', votes: 0 },
    { id: 5, emoji: '🪅', votes: 0 }
  ];

  const [emojis, setEmojis] = useState(defaultEmojis);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('emojiVotingData');
    if (savedData) {
      try {
        setEmojis(JSON.parse(savedData));
      } catch (error) {
        console.error('Помилка завантаження з localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emojiVotingData', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = (id) => {
    setEmojis(prevEmojis => 
      prevEmojis.map(emoji => 
        emoji.id === id 
          ? { ...emoji, votes: emoji.votes + 1 }
          : emoji
      )
    );
  };

  const handleShowResults = () => {
    const currentWinner = emojis.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    );
    setWinner(currentWinner);
  };

  const handleResetResults = () => {
    setEmojis(defaultEmojis);
    setWinner(null);
  };

  return (
    <div className="container">
      <Header />

      <div className="emoji-container">
        {emojis.map(emoji => (
          <EmojiBox
            key={emoji.id}
            emoji={emoji.emoji}
            votes={emoji.votes}
            onVote={() => handleVote(emoji.id)}
          />
        ))}
      </div>

      <BtnShowResult onShowResults={handleShowResults} />

      <Winner winner={winner} />

      <BtnResetResult onResetResults={handleResetResults} />
    </div>
  );
}

export default App;