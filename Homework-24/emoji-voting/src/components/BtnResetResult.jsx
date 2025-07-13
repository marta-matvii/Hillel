function BtnResetResult({ onResetResults }) {
  return (
    <div className="button-container">
      <button 
        className="btn btn-secondary" 
        onClick={onResetResults}
      >
        Очистити результати
      </button>
    </div>
  );
}

export default BtnResetResult;