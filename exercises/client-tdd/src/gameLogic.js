export function getWinner(board) {
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] === board[2][2]
  ) {
    return board[1][1];
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] === board[2][0]
  ) {
    return board[1][1];
  }

  for(let i = 0; i < 3; i++) {
    if(
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0];
    }
    if(
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }

  return '';
}

export function hasEmptyCells(board) {
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return true;
      }
    }
  }
  return false;
}
