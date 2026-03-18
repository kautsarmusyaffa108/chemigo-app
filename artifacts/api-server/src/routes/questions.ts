import { Router, type IRouter } from "express";
import { GetQuestionsResponse, GetQuestionsQueryParams } from "@workspace/api-zod";
import { getQuestionsForLesson } from "../data/questions.js";

const router: IRouter = Router();

router.get("/questions", (req, res) => {
  try {
    const query = GetQuestionsQueryParams.parse(req.query);
    const questions = getQuestionsForLesson(query.lessonId, query.difficulty);

    return res.json(GetQuestionsResponse.parse(questions));
  } catch (err) {
    console.error("GET /questions error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
