import { Component } from 'react';
import './App.css'

import Header from './components/Header'
import EmojiBox from './components/EmojiBox'
import BtnShowResult from './components/BtnShowResult'
import BtnResetResult from './components/BtnResetResult'
import Winner from './components/Winner'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.defaultEmojis = [
      { id: 1, emoji: '🪼', votes: 0 },
      { id: 2, emoji: '🪲', votes: 0 },
      { id: 3, emoji: '⛱️', votes: 0 },
      { id: 4, emoji: '🪩', votes: 0 },
      { id: 5, emoji: '🪅', votes: 0 }
    ];

    this.state = {
      emojis: this.loadFromLocalStorage(),
      winner: null
    };
  }

  componentDidMount() {
    this.saveToLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.emojis !== this.state.emojis) {
      this.saveToLocalStorage();
    }
  }

  loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('emojiVotingData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Помилка завантаження з localStorage:', error);
    }
    return this.defaultEmojis;
  }

  saveToLocalStorage = () => {
    try {
      localStorage.setItem('emojiVotingData', JSON.stringify(this.state.emojis));
    } catch (error) {
      console.error('Помилка збереження в localStorage:', error);
    }
  }

  handleVote = (id) => {
    this.setState(prevState => ({
      emojis: prevState.emojis.map(emoji => 
        emoji.id === id 
          ? { ...emoji, votes: emoji.votes + 1 }
          : emoji
      )
    }));
  }

  handleShowResults = () => {
    const currentWinner = this.state.emojis.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    );
    this.setState({ winner: currentWinner });
  }

  handleResetResults = () => {
    this.setState({
      emojis: this.defaultEmojis,
      winner: null
    });
  }

  render() {
    const { emojis, winner } = this.state;

    return (
      <div className="container">
        <Header />

        <div className="emoji-container">
          {emojis.map(emoji => (
            <EmojiBox
              key={emoji.id}
              emoji={emoji.emoji}
              votes={emoji.votes}
              onVote={() => this.handleVote(emoji.id)}
            />
          ))}
        </div>

        <BtnShowResult onShowResults={this.handleShowResults} />

        <Winner winner={winner} />

        <BtnResetResult onResetResults={this.handleResetResults} />
      </div>
    );
  }
}

export default App;