import { Monument, RecognitionResult } from '../types/monument';
import { monumentsData } from '../data/monuments';

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to get all monuments
export async function getMonuments(): Promise<Monument[]> {
  await delay(300); // Simulate network delay
  return [...monumentsData];
}

// Function to get a monument by ID
export async function getMonumentById(id: number): Promise<Monument> {
  await delay(200);
  const monument = monumentsData.find(m => m.id === id);
  
  if (!monument) {
    throw new Error('Monument not found');
  }
  
  return monument;
}

// Function to get monuments by category
export async function getMonumentsByCategory(category: string): Promise<Monument[]> {
  await delay(300);
  if (category === "All Monuments") {
    return [...monumentsData];
  }
  return monumentsData.filter(m => m.category === category);
}

// Simulated monument recognition function
export async function recognizeMonument(imageFile: File): Promise<{ recognition: RecognitionResult, monument: Monument }> {
  await delay(2000); // Simulate processing time
  
  // Select a random monument for the "recognition"
  const randomIndex = Math.floor(Math.random() * monumentsData.length);
  const monument = monumentsData[randomIndex];
  
  // Create a local URL for the uploaded image
  const imageUrl = URL.createObjectURL(imageFile);
  
  // Generate a simulated recognition result
  const recognition: RecognitionResult = {
    id: Math.floor(Math.random() * 1000),
    monumentId: monument.id,
    imageUrl,
    confidence: (80 + Math.floor(Math.random() * 20)).toString() + "%",
    timestamp: new Date().toISOString()
  };
  
  return { recognition, monument };
}

// List of monument categories
export const monumentCategories = [
  "All Monuments",
  "Roman Era",
  "Islamic Architecture",
  "Coastal Village",
  "Ancient Ruins",
  "Berber Village",
  "Historical City"
];
