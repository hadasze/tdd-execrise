import GamePO, { getElementText } from './game.po';
import axios from 'axios';

const PLAYER_1_NAME = 'ImX';
const PLAYER_2_NAME = 'ImO';

describe('Tic tac to game', () => {
  let gamePO;

  beforeEach(async () => {
    gamePO = new GamePO();
    await gamePO.navigate();
    await gamePO.fillInForm(PLAYER_1_NAME, PLAYER_2_NAME);
  });

  describe('Register phase', () => {
    it('Should register both players and add them to title', async () => {
      const isPlayer1TitleExists = !!(await page.$('#player-1-title'));
      expect(isPlayer1TitleExists).toBeFalsy();

      await gamePO.clickStart();

      expect(await gamePO.getPlayerTitle(1)).toEqual(PLAYER_1_NAME);
      expect(await gamePO.getPlayerTitle(2)).toEqual(PLAYER_2_NAME);
    });
  });

  describe('Playing phase', () => {
    beforeEach(async () => {
      await gamePO.clickStart();
    });

    it('Should mark cells with X and O', async () => {
      await gamePO.clickCellAt(0, 0);
      const markedX = await gamePO.getCellValueAt(0, 0);
      expect(markedX).toBe('X');
      await gamePO.clickCellAt(1, 0);
      const markedO = await gamePO.getCellValueAt(1, 0);
      expect(markedO).toBe('O');
    });

    it('Should play a full game an announce a winner', async () => {
      await gamePO.clickCellAt(0, 0);
      await gamePO.clickCellAt(1, 0);
      await gamePO.clickCellAt(0, 1);
      await gamePO.clickCellAt(1, 1);
      await gamePO.clickCellAt(0, 2);

      expect(await getElementText('#winner')).toBe(PLAYER_1_NAME);
    });

    it('Should play a full game an announce a tie', async () => {
      // X X 0
      // O O X
      // X X O
      await gamePO.clickCellAt(0, 0);
      await gamePO.clickCellAt(1, 0);
      await gamePO.clickCellAt(2, 0);
      await gamePO.clickCellAt(1, 1);
      await gamePO.clickCellAt(0, 1);
      await gamePO.clickCellAt(0, 2);
      await gamePO.clickCellAt(2, 1);
      await gamePO.clickCellAt(2, 2);
      await gamePO.clickCellAt(1, 2);

      expect(await getElementText('#tie')).toBe('This is a Tie !');
    });

    it('Should play a full game an announce a winner and not announce a tie if last step.', async () => {
      // X O X
      // O X X
      // X O O
      await gamePO.clickCellAt(0, 0);
      await gamePO.clickCellAt(1, 0);
      await gamePO.clickCellAt(2, 0);
      await gamePO.clickCellAt(0, 1);
      await gamePO.clickCellAt(1, 1);
      await gamePO.clickCellAt(2, 1);
      await gamePO.clickCellAt(1, 2);
      await gamePO.clickCellAt(2, 2);
      await gamePO.clickCellAt(0, 2);

      expect(await getElementText('#winner')).toBe(PLAYER_1_NAME);
    });

    it('Should not be able to override step, and does not skip turn', async () => {
      await gamePO.clickCellAt(0, 0);
      const c00 = await gamePO.getCellValueAt(0, 0);
      expect(c00).toBe('X');

      await gamePO.clickCellAt(1, 0);
      const c10Before = await gamePO.getCellValueAt(1, 0);
      expect(c10Before).toBe('O');

      // Trying to override O with X, should still be O (and it's stll X turn).
      await gamePO.clickCellAt(1, 0); // O
      const c10After = await gamePO.getCellValueAt(1, 0);
      expect(c10After).toBe('O');

      await gamePO.clickCellAt(1, 1); // X
      const c11 = await gamePO.getCellValueAt(1, 1);
      expect(c11).toBe('X');
    });

    it('Should not be able to play, after game is done', async () => {
      await gamePO.clickCellAt(0, 0);
      await gamePO.clickCellAt(1, 0);
      await gamePO.clickCellAt(0, 1);
      await gamePO.clickCellAt(1, 1);
      await gamePO.clickCellAt(0, 2);

      const winner = await getElementText('#winner');
      expect(winner).toBe(PLAYER_1_NAME);

      await gamePO.clickCellAt(2, 2);
      const newValue = await gamePO.getCellValueAt(2, 2);
      expect(newValue).toBe('');
    });

    it('should save and load game', async () => {
      await gamePO.clickCellAt(1, 0);
      await gamePO.clickCellAt(0, 0);
      await gamePO.clickCellAt(1, 1);
      await gamePO.clickCellAt(0, 1);
      await gamePO.clickCellAt(2, 0);
      await gamePO.clickCellAt(0, 2);

      await gamePO.saveGame();
      await gamePO.navigate();
      await gamePO.loadGame();

      expect(await getElementText('#winner')).toBe(PLAYER_2_NAME);
    });

    describe('Leaderboard', () => {
      const clearLeaderBoard = async () => {
        const url = app.getUrl('/api/leaderboard/clear');
        await axios.post(url);
      };

      beforeEach(async () => {
        // Just to be clear, In real life situation I wouldn't expose an endpoint for resetting the leaderboard.
        await clearLeaderBoard();
      });

      afterAll(async () => {
        await clearLeaderBoard();
      });

      it('should check leaderboard exists', async () => {
        const leaderBoard = await gamePO.getLeaderBoard();
        expect(leaderBoard).toBeDefined();
      });

      it('should save user score', async () => {
        let leaderBoard = await gamePO.getLeaderBoard();
        expect(leaderBoard).toEqual([]);
        await gamePO.clickCellAt(1, 0);
        await gamePO.clickCellAt(0, 0);
        await gamePO.clickCellAt(1, 1);
        await gamePO.clickCellAt(0, 1);
        await gamePO.clickCellAt(2, 0);
        await gamePO.clickCellAt(0, 2);
        expect(await getElementText('#winner')).toBe(PLAYER_2_NAME);

        leaderBoard = await gamePO.getLeaderBoard();
        expect(leaderBoard).toEqual([[PLAYER_2_NAME, '1']]);

        await gamePO.navigate();
        await gamePO.fillInForm(PLAYER_1_NAME, PLAYER_2_NAME);
        await gamePO.clickStart();

        await gamePO.clickCellAt(0, 0);
        await gamePO.clickCellAt(1, 0);
        await gamePO.clickCellAt(0, 1);
        await gamePO.clickCellAt(1, 1);
        await gamePO.clickCellAt(0, 2);
        await gamePO.clickCellAt(2, 0);

        expect(await getElementText('#winner')).toBe(PLAYER_1_NAME);

        leaderBoard = await gamePO.getLeaderBoard();
        expect(leaderBoard).toEqual([
          [PLAYER_2_NAME, '1'],
          [PLAYER_1_NAME, '1'],
        ]);

        await gamePO.navigate();
        await gamePO.fillInForm(PLAYER_1_NAME, PLAYER_2_NAME);
        await gamePO.clickStart();

        await gamePO.clickCellAt(0, 0);
        await gamePO.clickCellAt(1, 0);
        await gamePO.clickCellAt(0, 1);
        await gamePO.clickCellAt(1, 1);
        await gamePO.clickCellAt(0, 2);
        await gamePO.clickCellAt(2, 0);

        expect(await getElementText('#winner')).toBe(PLAYER_1_NAME);

        leaderBoard = await gamePO.getLeaderBoard();
        expect(leaderBoard).toEqual([
          [PLAYER_1_NAME, '2'],
          [PLAYER_2_NAME, '1'],
        ]);
      });
    });
  });
});
