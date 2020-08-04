import { getWinner } from './gameLogic';

function initBoard() {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
}

describe('Game logic', () => {
  describe('getWinner', () => {
    let board = [];
    const currentPlayer = 'X';

    beforeEach(() => (board = initBoard()));

    it('X should be able to win with a row', () => {
      board = [
        ['X', 'X', 'X'],
        ['', '', ''],
        ['', '', ''],
      ];
      const result = getWinner(board, currentPlayer);
      expect(result).toBe(currentPlayer);
    });

    it('X should be able to win with a column', () => {
      board = [
        ['', '', 'X'],
        ['', '', 'X'],
        ['', '', 'X'],
      ];
      const result = getWinner(board, currentPlayer);
      expect(result).toBe(currentPlayer);
    });

    it('X should be able to win with a diagonal', () => {
      board = [
        ['X', '', ''],
        ['', 'X', ''],
        ['', '', 'X'],
      ];
      const result = getWinner(board, currentPlayer);
      expect(result).toBe(currentPlayer);
    });

    it('should be a tie if no player has won', () => {
      const tiedBoard = [
        ['X', 'X', 'O'],
        ['O', 'O', 'X'],
        ['X', 'O', 'X'],
      ];
      const result = getWinner(tiedBoard, currentPlayer);
      expect(result).toBe('Tie');
    });
  });
});
