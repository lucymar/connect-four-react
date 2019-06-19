import React from 'react';
import './App.css';

const createBoard = () => {
  let board = [];
  for (let i = 0; i < 42; i++) {
    board.push({ player: null, index: i });
  }
  return board;
};

const findLowestCell = (board, col) => {
  for (let i = 35 + col; i >= 0; i -= 7) {
    if (board[i].player === null) return i;
  }
  return -1;
};

const switchPlayers = currentPlayer => {
  if (currentPlayer === 'playerOne') {
    return 'playerTwo';
  } else return 'playerOne';
};

const getGameState = board => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const index = i * 7 + j;
      const currentGroup = board.slice(index, index + 4);
      const result = checkGroupOfFour(currentGroup);
      if (result !== false) return result;
    }
  }
};

const checkGroupOfFour = values => {
  if (values.some(value => value.player === null)) {
    return false;
  } else if (
    values[0].player === values[1].player &&
    values[1].player === values[2].player &&
    values[2].player === values[3].player
  ) {
    return values[1].player;
  }
  return false;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // playerOne: 1,
      // playerTwo: 2,
      currentPlayer: 'playerOne',
      board: createBoard(),
      gameOver: false,
      result: '',
    };
    this.fillCell = this.fillCell.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.dropTile = this.dropTile.bind(this);
  }

  renderCells() {
    const board = this.state.board;
    return board.map((player, index) => {
      return this.fillCell(player.player, index);
    });
  }

  fillCell(player, idx) {
    return (
      <div
        className={`cell ${player}`}
        key={idx}
        onClick={this.handleClick.bind(null, idx)}
        data-player={player}
      />
    );
  }

  handleClick(index) {
    let col = index % 7;
    this.dropTile(col);
  }
  dropTile(col) {
    const board = this.state.board;
    const currentPlayer = this.state.currentPlayer;
    const index = findLowestCell(board, col);
    const boardCopy = board.slice();
    boardCopy[index].player = currentPlayer;

    const gameState = getGameState(boardCopy);
    console.log('GAMESTATE,', gameState);
    this.setState({
      board: boardCopy,
      currentPlayer: switchPlayers(currentPlayer),
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Connect Four</h2>
        <div className="board">{this.renderCells()}</div>
      </div>
    );
  }
}

export default App;
