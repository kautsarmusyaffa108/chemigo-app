import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { userProgressTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { GetLeaderboardResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/leaderboard", async (_req, res) => {
  try {
    const rows = await db.select().from(userProgressTable)
      .orderBy(desc(userProgressTable.xp))
      .limit(20);

    const leaderboard = rows.map((row, index) => ({
      rank: index + 1,
      sessionId: row.sessionId.slice(0, 8) + "...",
      xp: row.xp,
      streak: row.streak,
      completedLessonsCount: JSON.parse(row.completedLessons).length,
    }));

    return res.json(GetLeaderboardResponse.parse(leaderboard));
  } catch (err) {
    console.error("GET /leaderboard error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
