import React from 'react';
import './App.css';
import {
  createBoard,
  findLowestEmptyCell,
  switchPlayers,
  getGameState,
} from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'playerOne',
      board: createBoard(),
      gameOver: false,
      result: '',
    };
  }

  renderBoard = () => {
    const board = this.state.board;
    return board.map((row, key) => {
      return row.map((player, idx) => {
        return this.fillCells(player, idx, key);
      });
    });
  };

  fillCells = (player, j, i) => {
    let coordinates = [j, i];
    return (
      <div
        className={`cell`}
        key={coordinates}
        onClick={() => this.handleClick(coordinates)}
        data-player={player.player}
      />
    );
  };

  handleClick = indices => {
    let col = indices[0];
    return this.state.gameOver === false ? this.play(col) : null;
  };

  play = col => {
    const board = this.state.board;
    const currentPlayer = this.state.currentPlayer;
    const index = findLowestEmptyCell(board, col);
    if (index === -1) {
      this.setState({
        result: 'This is not a valid play',
      });
      return;
    }

    const boardCopy = board.slice();
    boardCopy[index][col].player = currentPlayer;

    const gameState = getGameState(boardCopy);
    if (gameState === null) {
      this.setState({
        board: boardCopy,
        currentPlayer: switchPlayers(currentPlayer),
        result: '',
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
  };

  handleSubmit = () => {
    this.setState({
      board: createBoard(),
      gameOver: false,
      result: '',
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Connect Four</h2>
        <div>
          {this.state.result.length > 0 ? <h4>{this.state.result}!</h4> : null}

          <button onClick={() => this.handleSubmit()}>Start Over</button>
        </div>
        <br />
        {this.state.gameOver === false ? (
          <h4 className="message" data-player={this.state.currentPlayer}>
            It is {this.state.currentPlayer}'s turn
          </h4>
        ) : null}
        <div className="board">{this.renderBoard()}</div>
      </div>
    );
  }
}

export default App;
