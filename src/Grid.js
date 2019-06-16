import React from 'react';
import Cell from './Cell';

class Grid extends React.Component {
  render() {
    let cells = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        row.push(
          <Cell>
            x={j} y={i}
          </Cell>
        );
      }
      cells.push(<div>{row}</div>);
    }
    return { cells };
  }
}

export default Grid;
