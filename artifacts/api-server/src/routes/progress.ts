import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { userProgressTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { SaveProgressBody } from "@workspace/api-zod";

const router: IRouter = Router();

function rowToProgress(row: typeof userProgressTable.$inferSelect) {
  return {
    id: row.id,
    sessionId: row.sessionId,
    hearts: row.hearts,
    xp: row.xp,
    streak: row.streak,
    completedLessons: JSON.parse(row.completedLessons) as string[],
    currentLesson: row.currentLesson ?? null,
    lastHeartRefill: row.lastHeartRefill?.toISOString() ?? null,
  };
}

router.get("/progress", async (req, res) => {
  try {
    const sessionId = req.query.sessionId as string;
    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const rows = await db.select().from(userProgressTable).where(eq(userProgressTable.sessionId, sessionId));

    if (rows.length === 0) {
      const newProgress = await db.insert(userProgressTable).values({
        sessionId,
        hearts: 5,
        xp: 0,
        streak: 0,
        completedLessons: "[]",
        currentLesson: null,
        lastHeartRefill: new Date(),
      }).returning();

      return res.json(rowToProgress(newProgress[0]));
    }

    return res.json(rowToProgress(rows[0]));
  } catch (err) {
    console.error("GET /progress error:", String(err));
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/progress", async (req, res) => {
  try {
    const body = SaveProgressBody.parse(req.body);

    const rows = await db.select().from(userProgressTable).where(eq(userProgressTable.sessionId, body.sessionId));

    let row;
    if (rows.length === 0) {
      const inserted = await db.insert(userProgressTable).values({
        sessionId: body.sessionId,
        hearts: body.hearts,
        xp: body.xp,
        streak: body.streak,
        completedLessons: JSON.stringify(body.completedLessons),
        currentLesson: body.currentLesson ?? null,
        lastHeartRefill: new Date(),
        updatedAt: new Date(),
      }).returning();
      row = inserted[0];
    } else {
      const updated = await db.update(userProgressTable)
        .set({
          hearts: body.hearts,
          xp: body.xp,
          streak: body.streak,
          completedLessons: JSON.stringify(body.completedLessons),
          currentLesson: body.currentLesson ?? null,
          updatedAt: new Date(),
        })
        .where(eq(userProgressTable.sessionId, body.sessionId))
        .returning();
      row = updated[0];
    }

    return res.json(rowToProgress(row));
  } catch (err) {
    console.error("POST /progress error:", String(err));
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
