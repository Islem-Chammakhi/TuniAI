import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Monument schema
export const monuments = pgTable("monuments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  era: text("era").notNull(),
  details: jsonb("details").notNull(),
  imageUrl: text("image_url").notNull(),
  coordinates: jsonb("coordinates").notNull(),
});

export const insertMonumentSchema = createInsertSchema(monuments).pick({
  name: true,
  description: true,
  location: true,
  category: true,
  era: true,
  details: true,
  imageUrl: true,
  coordinates: true,
});

// Recognition result schema
export const recognitionResults = pgTable("recognition_results", {
  id: serial("id").primaryKey(),
  monumentId: integer("monument_id").notNull(),
  imageUrl: text("image_url").notNull(),
  confidence: text("confidence").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertRecognitionResultSchema = createInsertSchema(recognitionResults).pick({
  monumentId: true,
  imageUrl: true,
  confidence: true,
  timestamp: true,
});

// User uploaded images schema
export const userImages = pgTable("user_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  processed: boolean("processed").notNull().default(false),
  timestamp: text("timestamp").notNull(),
});

export const insertUserImageSchema = createInsertSchema(userImages).pick({
  imageUrl: true,
  processed: true,
  timestamp: true,
});

// Export types
export type Monument = typeof monuments.$inferSelect;
export type InsertMonument = z.infer<typeof insertMonumentSchema>;

export type RecognitionResult = typeof recognitionResults.$inferSelect;
export type InsertRecognitionResult = z.infer<typeof insertRecognitionResultSchema>;

export type UserImage = typeof userImages.$inferSelect;
export type InsertUserImage = z.infer<typeof insertUserImageSchema>;
