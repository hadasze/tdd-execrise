function checkColumns(board) {
  return board.some((_, i) => {
    if (!board[i][0] || !board[i][1] || !board[i][2]) return false;
    return board[i][0] === board[i][1] && board[i][1] === board[i][2];
  });
}

function checkRows(board) {
  return board.some((_, i) => {
    if (!board[0][i] || !board[1][i] || !board[2][i]) return false;
    return board[0][i] === board[1][i] && board[1][i] === board[2][i];
  });
}

function checkDiagonals(board) {
  return (
    (board[0][0] &&
      board[1][1] &&
      board[2][2] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) ||
    (board[2][0] &&
      board[1][1] &&
      board[0][2] &&
      board[2][0] === board[1][1] &&
      board[1][1] === board[0][2])
  );
}

function checkTie(board) {
  return board.every((row) => row.every((tile) => tile));
}

export function getWinner(board, currentPlayer) {
  if (checkRows(board) || checkColumns(board) || checkDiagonals(board)) {
    return currentPlayer;
  } else if (checkTie(board)) {
    return 'Tie';
  } else {
    return '';
  }
}
