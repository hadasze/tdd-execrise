import {Router} from 'express'

const gameRouter = Router()
let game = {};

gameRouter.post('/game', (req, res) => {
  game = req.body;
  res.end();
});

gameRouter.get('/game', (req, res) => {
  res.send(game);
});

export default gameRouter
