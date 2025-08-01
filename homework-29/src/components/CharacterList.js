import React from 'react';
import { useSelector } from 'react-redux';
import CharacterCard from './CharacterCard';

function CharacterList() {
  const { person, loading, error } = useSelector(state => state);

  return (
    <div className="row">
      {loading && (
        <div className="col-12 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="col-12">
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        </div>
      )}

      {person && (
        <CharacterCard 
          name={person.name}
          height={person.height}
          gender={person.gender}
          birthYear={person.birth_year}
        />
      )}

      {!person && !loading && !error && (
        <div className="col-12 text-center">
          <p className="text-muted">No character data. Use search to load a character.</p>
        </div>
      )}
    </div>
  );
}

export default CharacterList;