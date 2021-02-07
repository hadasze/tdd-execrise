import { getWinner } from './gameLogic';

describe('Game logic', () => {
  describe('getWinner', () => {
    it('Should indicate X wins, in case first line is filled with X', () => {
      const result = getWinner([
        ['X', 'X', 'X'],
        ['', '', ''],
        ['', '', ''],
      ]);

      expect(result).toBe('X');
    });
    it('Should indicate X wins, in case first col is filled with X', () => {
      const result = getWinner([
        ['X', '', ''],
        ['X', '', ''],
        ['X', '', ''],
      ]);
      expect(result).toBe('X');
    });

    it('Should indicate O wins, in case diagonal is filled with O', () => {
      const result = getWinner([
        ['O', '', ''],
        ['', 'O', ''],
        ['', '', 'O'],
      ]);
      expect(result).toBe('O');
    });

    it('Should return tie when game is over without winners', () => {
      const result = getWinner([
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
        ['O', 'X', 'O'],
      ]);
      expect(result).toBe('Tie');
    });
  });
});
