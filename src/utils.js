export const createBoard = () => {
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

export const findLowestEmptyCell = (board, col) => {
  for (let i = 5; i >= 0; i -= 1) {
    if (board[i][col].player === null) {
      return i;
    }
  }
  return -1;
};

export const switchPlayers = currentPlayer => {
  if (currentPlayer === 'playerOne') {
    return 'playerTwo';
  } else return 'playerOne';
};

export const getGameState = board => {
  //horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col].player) {
        if (
          board[row][col].player === board[row][col + 1].player &&
          board[row][col].player === board[row][col + 2].player &&
          board[row][col].player === board[row][col + 3].player
        ) {
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
