import React from 'react';
import './App.css';

const createBoard = () => {
  let board = [];
  for (let i = 0; i < 42; i++) {
    board.push({ player: null, index: i });
  }
  return board;
};

const createSecondBoard = () => {
  let board = [];
  for (let i = 0; i < 6; i++) {
    let row = [];
    for (let j = 0; j < 7; j++) {
      row.push({ player: null });
    }
    board.push(row);
  }
  return board;
};

const findLowestCell = (board, col) => {
  for (let i = 5; i > 0; i -= 1) {
    console.log('BOARD', board);

    if (board[i][col].player === null) {
      return i;
    }
  }

  return -1;
};

const switchPlayers = currentPlayer => {
  if (currentPlayer === 'playerOne') {
    return 'playerTwo';
  } else return 'playerOne';
};

const getGameState = board => {
  //horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col].player) {
        if (
          board[row][col].player === board[row][col + 1].player &&
          board[row][col].player === board[row][col + 2].player &&
          board[row][col].player === board[row][col + 3].player
        ) {
          console.log('WINNIGN PLAYER', board[row][col].player);
          return board[row][col].player;
        }
      }
    }
  }

  //vertical
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col].player) {
        if (
          board[row][col].player === board[row - 1][col].player &&
          board[row][col].player === board[row - 2][col].player &&
          board[row][col].player === board[row - 3][col].player
        ) {
          console.log('WINNIGN PLAYER', board[row][col].player);
          return board[row][col].player;
        }
      }
    }
  }

  // diagonal right
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col <= 3; col++) {
      if (board[row][col].player) {
        if (
          board[row][col].player === board[row - 1][col + 1].player &&
          board[row][col].player === board[row - 2][col + 2].player &&
          board[row][col].player === board[row - 3][col + 3].player
        ) {
          console.log('WINNIGN PLAYER', board[row][col].player);
          return board[row][col].player;
        }
      }
    }
  }

  //diagonal left
  for (let row = 3; row < 6; row++) {
    for (let col = 3; col <= 6; col++) {
      if (board[row][col].player) {
        if (
          board[row][col].player === board[row - 1][col - 1].player &&
          board[row][col].player === board[row - 2][col - 2].player &&
          board[row][col].player === board[row - 3][col - 3].player
        ) {
          console.log('WINNIGN PLAYER', board[row][col].player);
          return board[row][col].player;
        }
      }
    }
  }

  //for tie
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (board[i][j].player === null) {
        return null;
      }
    }
    return 'This game has ended in a tie';
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // playerOne: 1,
      // playerTwo: 2,
      currentPlayer: 'playerOne',
      board: createSecondBoard(),
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
    console.log('BOARD', board);
    return board.map((row, key) => {
      return row.map((player, idx) => {
        return this.fillCell(player, idx, key);
      });
    });
  }

  fillCell(player, j, i) {
    let coordinates = [j, i];
    return (
      <div
        className={`cell ${player.player}`}
        key={coordinates}
        onClick={this.handleClick.bind(null, coordinates)}
        data-player={player.player}
      />
    );
  }

  handleClick(index) {
    let col = index[0];
    this.dropTile(col);
  }
  dropTile(col) {
    const board = this.state.board;
    const currentPlayer = this.state.currentPlayer;
    const index = findLowestCell(board, col);
    const boardCopy = board.slice();
    console.log('INDEX:', index, 'COL:', col);
    boardCopy[index][col].player = currentPlayer;

    const gameState = getGameState(boardCopy);
    console.log('board copy', boardCopy);
    console.log('GAMESTATE,', gameState);
    if (gameState === null) {
      this.setState({
        board: boardCopy,
        currentPlayer: switchPlayers(currentPlayer),
      });
    } else {
      if (gameState === 'playerTwo' || gameState === 'playerOne') {
        this.setState({
          board: boardCopy,
          gameOver: true,
          result: `${gameState} has won the game`,
        });
      } else {
        this.setState({
          board: boardCopy,
          gameOver: true,
          result: `${gameState}`,
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h2>Connect Four</h2>
        {this.state.result.length > 0 ? (
          <h4>{this.state.result}!</h4>
        ) : (
          <h4>It is {this.state.currentPlayer}'s turn</h4>
        )}
        <div className="board">{this.renderCells()}</div>
      </div>
    );
  }
}

export default App;
