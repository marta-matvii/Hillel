import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import NavigationButtons from './components/NavigationButtons';
import ClearButton from './components/ClearButton';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container mt-4">
          <Header />
          <SearchBar />
          <CharacterList />
          <NavigationButtons />
          <ClearButton />
        </div>
      </div>
    </Provider>
  );
}

export default App;