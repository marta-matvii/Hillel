import React from 'react';

function SearchBar() {
  return (
    <div className="row mb-4">
      <div className="col-md-6 mx-auto">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search characters..."
        />
      </div>
    </div>
  );
}

export default SearchBar;