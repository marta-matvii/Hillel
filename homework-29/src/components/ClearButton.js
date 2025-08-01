import React from 'react';
import { useDispatch } from 'react-redux';
import { clearData } from '../actions/swapiActions';

function ClearButton() {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearData());
  };

  return (
    <div className="text-center mt-4">
      <button 
        className="btn btn-danger"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}

export default ClearButton;