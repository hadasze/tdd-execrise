import axios from 'axios';

describe('When rendering', () => {
  it('should display a title', async () => {
    const aGame = {
      player1: 'Yaniv',
      player2: 'Gilad',
      isGameStarted: false,
      board: [
        ['X', '', ''],
        ['', 'O', ''],
        ['', 'X', ''],
      ],
      currentPlayer: 'O',
      winner: '',
    };

    const url = app.getUrl('/api/game');

    await axios.post(url, aGame);

    const { data: game } = await axios.get(url);

    expect(game).toEqual(aGame);
  });
});
