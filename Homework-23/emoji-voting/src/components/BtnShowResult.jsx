import { Component } from 'react';

class BtnShowResult extends Component {
  render() {
    const { onShowResults } = this.props;
    
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
}

export default BtnShowResult;