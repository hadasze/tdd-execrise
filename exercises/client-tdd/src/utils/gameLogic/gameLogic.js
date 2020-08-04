export function getWinner(board) {
  const winner = ['X', 'O'].find(
    (player) =>
      _checkRows(board, player) ||
      _checkColumns(board, player) ||
      _checkDiagonals(board, player),
  );

  return winner;
}

function _checkRows(board, player) {
  for (let i = 0; i <= 2; i++) {
    const didWin =
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player;
    if (didWin) return true;
  }
}

function _checkColumns(board, player) {
  for (let i = 0; i <= 2; i++) {
    const didWin =
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player;
    if (didWin) return true;
  }
}

function _checkDiagonals(board, player) {
  const topLeftDiagonal =
    board[0][0] === player && board[1][1] === player && board[2][2] === player;
  const topRighttDiagonal =
    board[0][2] === player && board[1][1] === player && board[2][0] === player;
  return topLeftDiagonal || topRighttDiagonal;
}
