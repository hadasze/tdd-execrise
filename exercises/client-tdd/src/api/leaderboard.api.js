import {Router} from 'express'

const leaderboardRouter = Router()
let leaderBoard = {};

function getTop10Players() {
  const playersScores = Object.entries(leaderBoard);

  const scores = playersScores.sort((a, b) => b[1] - a[1]);
  if (scores.length > 10) scores.length = 10;

  return scores;
}

leaderboardRouter.post('/leaderboard/clear', (req, res) => {
  leaderBoard = {};
  res.send();
});

leaderboardRouter.post('/leaderboard', (req, res) => {
  const {winner} = req.body;
  if (!winner)
    return res.send(400, {message: "'winner' field is missing."});

  leaderBoard[winner] = leaderBoard[winner] ? leaderBoard[winner] + 1 : 1;
  res.json(getTop10Players());
});

leaderboardRouter.get('/leaderboard', (req, res) => {
  res.send(getTop10Players());
});

export default leaderboardRouter

