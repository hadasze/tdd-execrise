import {Router} from 'express'
import gameRouter from "./game.api";
import leaderboardRouter from "./leaderboard.api";

const apiRouter = Router()

apiRouter.use('/api/', gameRouter)
apiRouter.use('/api/', leaderboardRouter)

export default apiRouter
