import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertUserImageSchema, insertRecognitionResultSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "dist/public/uploads");
      // Ensure directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all monuments
  app.get("/api/monuments", async (req: Request, res: Response) => {
    try {
      const monuments = await storage.getMonuments();
      res.status(200).json(monuments);
    } catch (error) {
      console.error("Error getting monuments:", error);
      res.status(500).json({ message: "Failed to retrieve monuments" });
    }
  });

  // Get monument by ID
  app.get("/api/monuments/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid monument ID" });
      }

      const monument = await storage.getMonumentById(id);
      if (!monument) {
        return res.status(404).json({ message: "Monument not found" });
      }

      res.status(200).json(monument);
    } catch (error) {
      console.error("Error getting monument:", error);
      res.status(500).json({ message: "Failed to retrieve monument" });
    }
  });

  // Get monuments by category
  app.get("/api/monuments/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const monuments = await storage.getMonumentsByCategory(category);
      res.status(200).json(monuments);
    } catch (error) {
      console.error("Error getting monuments by category:", error);
      res.status(500).json({ message: "Failed to retrieve monuments by category" });
    }
  });

  // Upload image and recognize monument
  app.post("/api/recognize", upload.single("image"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Save the uploaded image information
      const imageUrl = `/uploads/${req.file.filename}`;
      
      try {
        const userImageData = insertUserImageSchema.parse({
          imageUrl,
          processed: false,
          timestamp: new Date().toISOString(),
        });

        const savedImage = await storage.saveUserImage(userImageData);

        // Simulate AI recognition by randomly selecting a monument
        const monuments = await storage.getMonuments();
        const randomIndex = Math.floor(Math.random() * monuments.length);
        const recognizedMonument = monuments[randomIndex];

        // Calculate a random high confidence level (80-99%)
        const confidenceValue = (80 + Math.floor(Math.random() * 20)).toString() + "%";

        // Save the recognition result
        const recognitionData = insertRecognitionResultSchema.parse({
          monumentId: recognizedMonument.id,
          imageUrl,
          confidence: confidenceValue,
          timestamp: new Date().toISOString(),
        });

        const recognitionResult = await storage.saveRecognitionResult(recognitionData);

        // Update user image as processed
        await storage.updateUserImage(savedImage.id, true);

        // Return the recognition result with monument details
        res.status(200).json({
          recognition: recognitionResult,
          monument: recognizedMonument,
        });
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          return res.status(400).json({ message: validationError.message });
        }
        throw error;
      }
    } catch (error) {
      console.error("Error processing image recognition:", error);
      res.status(500).json({ message: "Failed to process image recognition" });
    }
  });

  // Get all recognition results
  app.get("/api/recognition-results", async (req: Request, res: Response) => {
    try {
      const results = await storage.getRecognitionResults();
      res.status(200).json(results);
    } catch (error) {
      console.error("Error getting recognition results:", error);
      res.status(500).json({ message: "Failed to retrieve recognition results" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
