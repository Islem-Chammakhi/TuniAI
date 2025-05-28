export interface Monument {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  era: string;
  details: {
    history: string;
    architecture: string;
    significance: string;
    visitorInfo: {
      openingHours: string;
      admissionFees: string;
      tips: string;
    };
  };
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RecognitionResult {
  id: number;
  imageUrl: string;
  confidence: string;
  timestamp: string;
  name: string;
}

export interface UserImage {
  id: number;
  imageUrl: string;
  processed: boolean;
  timestamp: string;
}

export const monumentCategories = [
  "All Monuments",
  "Roman Era",
  "Islamic Architecture",
  "Coastal Village",
  "Ancient Ruins",
  "Berber Village",
  "Historical City",
];
