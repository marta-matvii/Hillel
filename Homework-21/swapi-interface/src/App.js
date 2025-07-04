import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import NavigationButtons from './components/NavigationButtons';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <Header />
        <SearchBar />

        <div className="row">
          <CharacterCard 
            name="Luke Skywalker"
            height="172 cm"
            gender="Male"
            birthYear="19BBY"
          />

          <CharacterCard 
            name="Princess Leia"
            height="150 cm"
            gender="Female"
            birthYear="19BBY"
          />

          <CharacterCard 
            name="Darth Vader"
            height="202 cm"
            gender="Male"
            birthYear="41.9BBY"
          />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
}

export default App;