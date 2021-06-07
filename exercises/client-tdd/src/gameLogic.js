// export function getWinner(board) {
//   if (board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X') {
//     return 'X';
//   } else {
//     return '';
//   }
// }

export function getWinner(board) {

  const checkPlayerWon = (board, player) => {
    if (board[0][0] === player && board[0][1] === player && board[0][2] === player) {
      return true;
    }if (board[1][0] === player && board[1][1] === player && board[1][2] === player) {
      return true;
    }if (board[2][0] === player && board[2][1] === player && board[2][2] === player) {
      return true;
    }if (board[0][0] === player && board[1][0] === player && board[2][0] === player) {
      return true;
    }if (board[0][1] === player && board[1][1] === player && board[2][1] === player) {
      return true;
    }if (board[0][2] === player && board[1][2] === player && board[2][2] === player) {
      return true;
    }if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }else {
      return false;
    }
  }
  if (checkPlayerWon(board, 'X'))
    return 'X';
  if (checkPlayerWon(board, 'O'))
    return 'O';
  return '';
}


