import { 
  Monument, 
  InsertMonument, 
  RecognitionResult, 
  InsertRecognitionResult,
  UserImage, 
  InsertUserImage 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Monument methods
  getMonuments(): Promise<Monument[]>;
  getMonumentById(id: number): Promise<Monument | undefined>;
  getMonumentsByCategory(category: string): Promise<Monument[]>;
  createMonument(monument: InsertMonument): Promise<Monument>;
  
  // Recognition methods
  saveRecognitionResult(result: InsertRecognitionResult): Promise<RecognitionResult>;
  getRecognitionResults(): Promise<RecognitionResult[]>;
  getRecognitionResultById(id: number): Promise<RecognitionResult | undefined>;
  
  // User Image methods
  saveUserImage(image: InsertUserImage): Promise<UserImage>;
  getUserImages(): Promise<UserImage[]>;
  updateUserImage(id: number, processed: boolean): Promise<UserImage | undefined>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private monuments: Map<number, Monument>;
  private recognitionResults: Map<number, RecognitionResult>;
  private userImages: Map<number, UserImage>;
  private nextMonumentId: number;
  private nextRecognitionId: number;
  private nextUserImageId: number;

  constructor() {
    this.monuments = new Map();
    this.recognitionResults = new Map();
    this.userImages = new Map();
    this.nextMonumentId = 1;
    this.nextRecognitionId = 1;
    this.nextUserImageId = 1;
    
    // Initialize with some monument data
    this.initializeMonuments();
  }

  // Monument methods
  async getMonuments(): Promise<Monument[]> {
    return Array.from(this.monuments.values());
  }

  async getMonumentById(id: number): Promise<Monument | undefined> {
    return this.monuments.get(id);
  }

  async getMonumentsByCategory(category: string): Promise<Monument[]> {
    return Array.from(this.monuments.values()).filter(
      monument => monument.category === category
    );
  }

  async createMonument(monument: InsertMonument): Promise<Monument> {
    const id = this.nextMonumentId++;
    const newMonument: Monument = { ...monument, id };
    this.monuments.set(id, newMonument);
    return newMonument;
  }

  // Recognition methods
  async saveRecognitionResult(result: InsertRecognitionResult): Promise<RecognitionResult> {
    const id = this.nextRecognitionId++;
    const newResult: RecognitionResult = { ...result, id };
    this.recognitionResults.set(id, newResult);
    return newResult;
  }

  async getRecognitionResults(): Promise<RecognitionResult[]> {
    return Array.from(this.recognitionResults.values());
  }

  async getRecognitionResultById(id: number): Promise<RecognitionResult | undefined> {
    return this.recognitionResults.get(id);
  }

  // User Image methods
  async saveUserImage(image: InsertUserImage): Promise<UserImage> {
    const id = this.nextUserImageId++;
    const newImage: UserImage = { ...image, id };
    this.userImages.set(id, newImage);
    return newImage;
  }

  async getUserImages(): Promise<UserImage[]> {
    return Array.from(this.userImages.values());
  }

  async updateUserImage(id: number, processed: boolean): Promise<UserImage | undefined> {
    const image = this.userImages.get(id);
    if (!image) return undefined;
    
    const updatedImage: UserImage = { ...image, processed };
    this.userImages.set(id, updatedImage);
    return updatedImage;
  }

  // Initialize with sample monument data
  private initializeMonuments(): void {
    const monumentsData: InsertMonument[] = [
      {
        name: "El Djem Amphitheater",
        description: "One of the most impressive Roman remains in Africa, this 3rd-century monument is remarkably well-preserved.",
        location: "El Djem, Tunisia",
        category: "Roman Era",
        era: "3rd century AD",
        details: {
          history: "Built around 238 AD, it could accommodate up to 35,000 spectators and was used for gladiatorial contests and public spectacles.",
          architecture: "It's one of the largest Roman amphitheaters in the world, measuring 148 meters long and 122 meters wide.",
          significance: "The El Djem Amphitheater is one of the best preserved Roman stone ruins in the world and was declared a UNESCO World Heritage site in 1979.",
          visitorInfo: {
            openingHours: "8:00 AM - 5:30 PM (Winter), 8:00 AM - 7:00 PM (Summer)",
            admissionFees: "Adult: 12 TND, Student: 7 TND",
            tips: "Visit early morning or late afternoon to avoid crowds and heat."
          }
        },
        imageUrl: "https://pixabay.com/get/ga1cfe4e4c9a07281d7da01d4bd0874456154ea9205e2ae9297b061fa9cf7c7d4584e79662b747ebb6ab099a936a10900688e12686f185c238912136b1f59745f_1280.jpg",
        coordinates: { lat: 35.2961, lng: 10.7055 }
      },
      {
        name: "Sidi Bou Said",
        description: "A picturesque blue and white village perched on a cliff overlooking the Mediterranean Sea.",
        location: "Near Tunis, Tunisia",
        category: "Coastal Village",
        era: "13th century onwards",
        details: {
          history: "Named after a religious figure who lived there, Abou Said ibn Khalef ibn Yahia Ettamini el Beji (13th century).",
          architecture: "Famous for its extensive use of blue and white colors and stunning architecture influenced by Ottoman and Andalusian styles.",
          significance: "A major cultural and artistic hub that has attracted artists and writers from around the world.",
          visitorInfo: {
            openingHours: "Open 24/7 (individual attractions have their own hours)",
            admissionFees: "Free to walk around, individual attractions may have fees",
            tips: "Visit Café des Nattes for traditional mint tea and enjoy the sunset views over the Mediterranean."
          }
        },
        imageUrl: "https://pixabay.com/get/g6106261b4ac4ecdbabc4a4d0117ecfd2a522b9cb6cde27fb076505b1a3d2db986215eac071ec158d25eac1acc1a119f89d9bf0b9223bd514af543ce94bbd0e67_1280.jpg",
        coordinates: { lat: 36.8702, lng: 10.3417 }
      },
      {
        name: "Great Mosque of Kairouan",
        description: "One of the oldest and most prestigious Islamic monuments in North Africa, dating back to 670 AD.",
        location: "Kairouan, Tunisia",
        category: "Islamic Architecture",
        era: "7th-9th century",
        details: {
          history: "Founded in 670 AD by the Arab general Uqba ibn Nafi, it has served as a model for other mosques in the Maghreb region.",
          architecture: "The mosque has a magnificent courtyard, an impressive prayer hall with 414 columns, and a distinctive square minaret.",
          significance: "Considered the fourth holiest site in Islam after Mecca, Medina, and Jerusalem.",
          visitorInfo: {
            openingHours: "8:00 AM - 6:30 PM (Summer), 8:00 AM - 5:30 PM (Winter), Closed during prayer times for non-Muslims",
            admissionFees: "Adults: 8 TND, Students: 4 TND, Children under 12: Free",
            tips: "Modest clothing required (shoulders and knees covered). Women should cover their hair."
          }
        },
        imageUrl: "https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-4.0.3&q=85&w=1200&h=800&fit=crop",
        coordinates: { lat: 35.6813, lng: 10.1031 }
      },
      {
        name: "Ruins of Carthage",
        description: "The remains of the great ancient city of Carthage, once the center of the Carthaginian Empire.",
        location: "Tunis, Tunisia",
        category: "Ancient Ruins",
        era: "814 BC - 146 BC",
        details: {
          history: "Founded by Phoenicians in the 9th century BC, it grew to become a major Mediterranean power before being destroyed by Rome in 146 BC.",
          architecture: "Includes the Antonine Baths, Tophet sanctuary, Byrsa Hill, and several residential quarters showing Punic and Roman influences.",
          significance: "One of the most important archaeological sites in the Mediterranean, designated a UNESCO World Heritage site in 1979.",
          visitorInfo: {
            openingHours: "8:30 AM - 5:30 PM (Winter), 8:00 AM - 7:00 PM (Summer)",
            admissionFees: "10 TND for a combined ticket to multiple sites",
            tips: "The site is spread out, so plan for at least half a day to explore properly."
          }
        },
        imageUrl: "https://images.unsplash.com/photo-1523428461295-92770e70d7ae?ixlib=rb-4.0.3&q=85&w=1200&h=800&fit=crop",
        coordinates: { lat: 36.8525, lng: 10.3253 }
      },
      {
        name: "Chenini",
        description: "An ancient Berber village built into the mountainside, featuring unique cave dwellings.",
        location: "Tataouine, Tunisia",
        category: "Berber Village",
        era: "12th century",
        details: {
          history: "Founded in the 12th century as a fortified granary and refuge from attacks.",
          architecture: "Features cave dwellings built into the cliff face and a distinctive white mosque perched on the hillside.",
          significance: "One of the best-preserved examples of traditional Berber mountain villages in Tunisia.",
          visitorInfo: {
            openingHours: "Daylight hours (sunrise to sunset)",
            admissionFees: "Free, but guides are available for hire (~30 TND)",
            tips: "Wear comfortable shoes for climbing the rocky paths to see the entire village."
          }
        },
        imageUrl: "https://pixabay.com/get/g17a5c7bd77e252a5342bb9b677216c110041f6627405bdbf43c26faa73a0bcd5a2f029b0b081b681efa4f3e7f9c81163dcd3f4d1f6d81557a47b2a09eea58297_1280.jpg",
        coordinates: { lat: 32.9294, lng: 10.2624 }
      },
      {
        name: "Medina of Tunis",
        description: "The historic heart of Tunis, featuring maze-like streets, traditional souks, and Islamic architecture.",
        location: "Tunis, Tunisia",
        category: "Historical City",
        era: "8th century onwards",
        details: {
          history: "Founded in the 8th century, it grew to become the political, cultural, and commercial center of Tunisia.",
          architecture: "Features narrow winding streets, covered bazaars, mosques, madrasas, and traditional houses with inner courtyards.",
          significance: "A UNESCO World Heritage site since 1979, it contains over 700 monuments including palaces, mosques, and fountains.",
          visitorInfo: {
            openingHours: "Open 24/7, but shops typically open 9:00 AM - 7:00 PM",
            admissionFees: "Free to enter, individual monuments may have fees",
            tips: "Visit Zitouna Mosque, the oldest in Tunis, and explore the traditional souks for handicrafts and spices."
          }
        },
        imageUrl: "https://images.unsplash.com/photo-1570003179394-40b59f9b4a5a?ixlib=rb-4.0.3&q=85&w=1200&h=800&fit=crop",
        coordinates: { lat: 36.7992, lng: 10.1691 }
      },
      {
        name: "Ribat of Monastir",
        description: "A well-preserved medieval fortress used by Muslim warriors for both religious and military purposes.",
        location: "Monastir, Tunisia",
        category: "Islamic Architecture",
        era: "8th century",
        details: {
          history: "Founded in 796 AD during the Abbasid Caliphate as part of a coastal defense system.",
          architecture: "Square fortress with solid walls, watchtowers, a mosque, and living quarters for warriors.",
          significance: "One of the oldest and best-preserved ribats (Islamic fortresses) in North Africa.",
          visitorInfo: {
            openingHours: "8:00 AM - 6:00 PM (Summer), 8:30 AM - 5:30 PM (Winter)",
            admissionFees: "Adults: 9 TND, Students: 5 TND",
            tips: "Climb to the top of the watchtower for panoramic views of the city and sea."
          }
        },
        imageUrl: "https://pixabay.com/get/gd7267b941d40e5d0f7888aab1ad5a48888ccb095d900d9b6b1a72a5ca92338836f9265973ff44abed4ae666fd635ae7b6ce9a825dfb3ade3cf282053b8d7786e_1280.jpg",
        coordinates: { lat: 35.7781, lng: 10.8317 }
      },
      {
        name: "Zaytuna Mosque",
        description: "The oldest mosque in Tunis and an important religious and educational center in North Africa.",
        location: "Tunis, Tunisia",
        category: "Islamic Architecture",
        era: "8th century",
        details: {
          history: "Founded in 737 AD on the site of a Christian basilica, it became an important center for Islamic learning.",
          architecture: "Features a prayer hall with 184 columns, a large central courtyard, and a square minaret.",
          significance: "Home to one of the world's oldest universities and a major center for Islamic education throughout history.",
          visitorInfo: {
            openingHours: "8:00 AM - 6:00 PM (Closed during prayer times for non-Muslims)",
            admissionFees: "5 TND",
            tips: "Women must cover their hair, shoulders, and knees. Remove shoes before entering prayer hall."
          }
        },
        imageUrl: "https://pixabay.com/get/g39e906bbb56f7bf661ca90e32f3b7df4084deea3e713a2568e128b6ad2f67dc685e8944f82c2a84b90dee52928aa6a289295e18721b04cc8d32a01dc220e98a7_1280.jpg",
        coordinates: { lat: 36.7994, lng: 10.1702 }
      }
    ];

    // Add each monument to the storage
    monumentsData.forEach(monument => {
      this.createMonument(monument);
    });
  }
}

// Export the storage instance
export const storage = new MemStorage();
