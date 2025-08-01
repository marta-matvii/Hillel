import React from 'react';

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

export default CharacterCard;