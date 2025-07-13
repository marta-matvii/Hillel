function Winner({ winner }) {
  if (!winner) {
    return null;
  }

  return (
    <div className="results-container">
      <h2>Результати голосування:</h2>
      
      <div className="winner-section">
        
        <div className="winner-emoji">
          {winner.emoji}
        </div>
        
        <div className="winner-votes">
          Кількість голосів: {winner.votes}
        </div>
      </div>
    </div>
  );
}

export default Winner;