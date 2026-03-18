import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import progressRouter from "./progress.js";
import questionsRouter from "./questions.js";
import leaderboardRouter from "./leaderboard.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(progressRouter);
router.use(questionsRouter);
router.use(leaderboardRouter);

export default router;
