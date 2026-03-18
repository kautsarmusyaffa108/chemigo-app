import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userProgressTable = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  hearts: integer("hearts").notNull().default(5),
  xp: integer("xp").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  completedLessons: text("completed_lessons").notNull().default("[]"),
  currentLesson: text("current_lesson"),
  lastHeartRefill: timestamp("last_heart_refill"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserProgressSchema = createInsertSchema(userProgressTable).omit({ id: true, updatedAt: true });
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgressTable.$inferSelect;
