import { Monument, RecognitionResult } from "../types/monument";
import { monumentsData } from "../data/monuments";
import axios from "../lib/axios";

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all monuments
export async function getMonuments(): Promise<Monument[]> {
  await delay(300); // Simulate network delay
  return [...monumentsData];
}

// Get monument by ID
export async function getMonumentById(id: number): Promise<Monument> {
  await delay(200);
  const monument = monumentsData.find((m) => m.id === id);

  if (!monument) {
    throw new Error("Monument not found");
  }

  return monument;
}

// Get monuments by category
export async function getMonumentsByCategory(
  category: string
): Promise<Monument[]> {
  await delay(300);
  if (category === "All Monuments") {
    return [...monumentsData];
  }
  return monumentsData.filter((m) => m.category === category);
}

// Simulated monument recognition
export async function recognizeMonument(
  imageFile: File
): Promise<{ recognition: RecognitionResult }> {
  await delay(2000); // Simulate processing time
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await axios.post("predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response from server:", response.data);
    if (response.status !== 200) {
      throw new Error("Failed to recognize monument");
    }
    // Create a local URL for the uploaded image
    const imageUrl = URL.createObjectURL(imageFile);

    // Generate a simulated recognition result
    const recognition: RecognitionResult = {
      id: Math.floor(Math.random() * 1000),
      imageUrl,
      confidence: (response.data.confidence * 100).toFixed(3) + "%",
      timestamp: new Date().toISOString(),
      name: response.data.predicted_class || "Unknown Monument",
    };

    return { recognition };
  } catch (error) {
    throw new Error("Failed to recognize monument. Please try again.");
  }
}

// Export monument categories for filtering
export { monumentCategories } from "../types/monument";
