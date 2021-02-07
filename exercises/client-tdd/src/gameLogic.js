export function getWinner(board) {
  if (board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X') {
    return 'X';
  } else {
    return '';
  }
}
