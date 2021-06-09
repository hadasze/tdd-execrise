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

    it('Should indicate O wins, in case first line is filled with O', () => {
      const result = getWinner([
        ['O', 'O', 'O'],
        ['', '', ''],
        ['', '', ''],
      ]);

      expect(result).toBe('O');
    });

    it('Should indicate X wins, in case daignol is filled with X', () => {
      const result = getWinner([
        ['X', '', ''],
        ['', 'X', ''],
        ['', '', 'X'],
      ]);

      expect(result).toBe('X');
    });

    it('Should indicate O wins, in case daignol is filled with O', () => {
      const result = getWinner([
        ['', '', 'O'],
        ['', 'O', ''],
        ['O', '', ''],
      ]);

      expect(result).toBe('O');
    });

    it('Should indicate O wins, in case column is filled with O', () => {
      const result = getWinner([
        ['', '', 'O'],
        ['', '', 'O'],
        ['', '', 'O'],
      ]);

      expect(result).toBe('O');
    });

    it('Should indicate X wins, in case column is filled with X', () => {
      const result = getWinner([
        ['X', '', ''],
        ['X', '', ''],
        ['X', '', ''],
      ]);

      expect(result).toBe('X');
    });


  });
});
