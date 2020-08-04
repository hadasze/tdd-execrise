import axios from "axios";

describe('LeaderBoard API', () => {
  it('should keep the record of a winning user', async () => {
    const url = app.getUrl('/api/leaderboard');

    const { data: leaderBoard1 } = await axios.post(url, { winner: 'tal' });
    expect(leaderBoard1).toStrictEqual([['tal', 1]]);

    const { data: leaderBoard2 } = await axios.post(url, { winner: 'harta' });
    expect(leaderBoard2).toStrictEqual([
      ['tal', 1],
      ['harta', 1],
    ]);

    const { data: leaderBoard3 } = await axios.post(url, { winner: 'harta' });
    expect(leaderBoard3).toStrictEqual([
      ['harta', 2],
      ['tal', 1],
    ]);

    // DO A "GET" NOT POST request and check it.
    const { data: leaderBoard4 } = await axios.get(url);
    expect(leaderBoard4).toStrictEqual([
      ['harta', 2],
      ['tal', 1],
    ]);
  });
});
