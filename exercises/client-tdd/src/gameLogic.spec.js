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
  });
});
