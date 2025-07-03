import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Star Wars Characters</h1>
        
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search characters..."
            />
          </div>
        </div>

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

        <div className="text-center mt-4">
          <button className="btn btn-secondary me-2">Previous</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
    </div>
  );
}

function CharacterCard({ name, height, gender, birthYear }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Height: {height}</p>
          <p className="card-text">Gender: {gender}</p>
          <p className="card-text">Birth Year: {birthYear}</p>
          <button className="btn btn-primary">View Details</button>
        </div>
      </div>
    </div>
  );
}

export default App;