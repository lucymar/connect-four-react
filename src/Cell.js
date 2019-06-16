import React from 'react';

class Cell extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.x},{this.props.y}
        </p>
      </div>
    );
  }
}

export default Cell;
