import { Component } from 'react';

class BtnResetResult extends Component {
  render() {
    const { onResetResults } = this.props;
    
    return (
      <div className="button-container">
        <button 
          className="btn btn-secondary" 
          onClick={onResetResults}
        >
          Очистити результат
        </button>
      </div>
    );
  }
}

export default BtnResetResult;