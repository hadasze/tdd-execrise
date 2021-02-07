export function getWinner(board) {
  // check Winner
  for (const player of ['X', 'O']) {
    if (
      (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) ||
      (board[2][0] === player &&
        board[1][1] === player &&
        board[0][2] === player)
    ) {
      return player;
    }
    for (let i = 0; i < board.length; i++) {
      if (
        (board[i][0] === player &&
          board[i][1] === player &&
          board[i][2] === player) ||
        (board[0][i] === player &&
          board[1][i] === player &&
          board[2][i] === player)
      ) {
        return player;
      }
    }
  }
  // check Tie
  const BOARD_SIZE = 9;
  let sequence = 0;
  for (const row of board) {
    for (const item of row) {
      if (item) {
        sequence++;
      }
    }
  }
  return sequence === BOARD_SIZE ? 'Tie' : '';
}
