import { getWinner } from './gameLogic';

describe('Game logic', () => {
  describe('getWinner', () => {
    describe(' Lines', () => {
      it('Should indicate winner, in case first line is filled with the same player', () => {
        const resultX = getWinner([
          ['X', 'X', 'X'],
          ['', '', ''],
          ['', '', ''],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['O', 'O', 'O'],
          ['', '', ''],
          ['', '', ''],
        ]);

        expect(resultO).toBe('O');
      });
      it('Should indicate winner, in case second line is filled with the same player', () => {
        const result = getWinner([
          ['', '', ''],
          ['X', 'X', 'X'],
          ['', '', ''],
        ]);

        expect(result).toBe('X');

        const resultO = getWinner([
          ['', '', ''],
          ['O', 'O', 'O'],
          ['', '', ''],
        ]);

        expect(resultO).toBe('O');
      });
      it('Should indicate winner, in case third line is filled with the same player', () => {
        const result = getWinner([
          ['', '', ''],
          ['', '', ''],
          ['X', 'X', 'X'],
        ]);

        expect(result).toBe('X');

        const resultO = getWinner([
          ['', '', ''],
          ['', '', ''],
          ['O', 'O', 'O'],
        ]);

        expect(resultO).toBe('O');
      });
    });
    describe(' Columns', () => {
      it('Should indicate winner, in case first column is filled with the same player', () => {
        const resultX = getWinner([
          ['X', '', ''],
          ['X', '', ''],
          ['X', '', ''],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['O', '', ''],
          ['O', '', ''],
          ['O', '', ''],
        ]);

        expect(resultO).toBe('O');
      });
      it('Should indicate winner, in case second column is filled with the same player', () => {
        const resultX = getWinner([
          ['', 'X', ''],
          ['', 'X', ''],
          ['', 'X', ''],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['', 'O', ''],
          ['', 'O', ''],
          ['', 'O', ''],
        ]);

        expect(resultO).toBe('O');
      });
      it('Should indicate winner, in case third column is filled with the same player', () => {
        const resultX = getWinner([
          ['', '', 'X'],
          ['', '', 'X'],
          ['', '', 'X'],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['', '', 'O'],
          ['', '', 'O'],
          ['', '', 'O'],
        ]);

        expect(resultO).toBe('O');
      });
    });
    describe(' Diagonals', () => {
      it('Should indicate winner, in case Diagonal top-left to bottom-right is filled with the same player', () => {
        const resultX = getWinner([
          ['X', '', ''],
          ['', 'X', ''],
          ['', '', 'X'],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['O', '', ''],
          ['', 'O', ''],
          ['', '', 'O'],
        ]);

        expect(resultO).toBe('O');
      });
      it('Should indicate winner, in case Diagonal top-right to bottom-left is filled with the same player', () => {
        const resultX = getWinner([
          ['', '', 'X'],
          ['', 'X', ''],
          ['X', '', ''],
        ]);

        expect(resultX).toBe('X');

        const resultO = getWinner([
          ['', '', 'O'],
          ['', 'O', ''],
          ['O', '', ''],
        ]);

        expect(resultO).toBe('O');
      });
    });
  });
});
