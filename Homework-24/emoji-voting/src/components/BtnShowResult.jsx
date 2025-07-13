function BtnShowResult({ onShowResults }) {
  return (
    <div className="button-container">
      <button 
        className="btn btn-primary" 
        onClick={onShowResults}
      >
        Показати результат
      </button>
    </div>
  );
}

export default BtnShowResult;