import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPerson } from '../actions/swapiActions';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('1');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchValue.trim()) {
      dispatch(fetchPerson(searchValue.trim()));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-md-6 mx-auto">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter character ID (e.g., 1, 2, 3...)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="btn btn-primary" 
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;