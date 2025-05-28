// Import type from relative path
import type { Monument } from "../types/monument";

export const monumentsData: Monument[] = [
  {
    name: "El Djem Amphitheater",
    description:
      "One of the most impressive Roman remains in Africa, this 3rd-century monument is remarkably well-preserved.",
    location: "El Djem, Tunisia",
    category: "Roman Era",
    era: "3rd century AD",
    details: {
      history:
        "Built around 238 AD, it could accommodate up to 35,000 spectators and was used for gladiatorial contests and public spectacles.",
      architecture:
        "It's one of the largest Roman amphitheaters in the world, measuring 148 meters long and 122 meters wide.",
      significance:
        "The El Djem Amphitheater is one of the best preserved Roman stone ruins in the world and was declared a UNESCO World Heritage site in 1979.",
      visitorInfo: {
        openingHours: "8:00 AM - 5:30 PM (Winter), 8:00 AM - 7:00 PM (Summer)",
        admissionFees: "Adult: 12 TND, Student: 7 TND",
        tips: "Visit early morning or late afternoon to avoid crowds and heat.",
      },
    },
    imageUrl:
      "https://the-travely.com/wp-content/uploads/2020/01/El-Djem4-scaled.jpg",
    coordinates: { lat: 35.2961, lng: 10.7055 },
    id: 1,
  },
  {
    name: "Sidi Bou Said",
    description:
      "A picturesque blue and white village perched on a cliff overlooking the Mediterranean Sea.",
    location: "Near Tunis, Tunisia",
    category: "Coastal Village",
    era: "13th century onwards",
    details: {
      history:
        "Named after a religious figure who lived there, Abou Said ibn Khalef ibn Yahia Ettamini el Beji (13th century).",
      architecture:
        "Famous for its extensive use of blue and white colors and stunning architecture influenced by Ottoman and Andalusian styles.",
      significance:
        "A major cultural and artistic hub that has attracted artists and writers from around the world.",
      visitorInfo: {
        openingHours: "Open 24/7 (individual attractions have their own hours)",
        admissionFees:
          "Free to walk around, individual attractions may have fees",
        tips: "Visit Café des Nattes for traditional mint tea and enjoy the sunset views over the Mediterranean.",
      },
    },
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/12/20/10/41/tunis-3885667_1280.jpg",
    coordinates: { lat: 36.8702, lng: 10.3417 },
    id: 2,
  },
  {
    name: "Great Mosque of Kairouan",
    description:
      "One of the oldest and most prestigious Islamic monuments in North Africa, dating back to 670 AD.",
    location: "Kairouan, Tunisia",
    category: "Islamic Architecture",
    era: "7th-9th century",
    details: {
      history:
        "Founded in 670 AD by the Arab general Uqba ibn Nafi, it has served as a model for other mosques in the Maghreb region.",
      architecture:
        "The mosque has a magnificent courtyard, an impressive prayer hall with 414 columns, and a distinctive square minaret.",
      significance:
        "Considered the fourth holiest site in Islam after Mecca, Medina, and Jerusalem.",
      visitorInfo: {
        openingHours:
          "8:00 AM - 6:30 PM (Summer), 8:00 AM - 5:30 PM (Winter), Closed during prayer times for non-Muslims",
        admissionFees:
          "Adults: 8 TND, Students: 4 TND, Children under 12: Free",
        tips: "Modest clothing required (shoulders and knees covered). Women should cover their hair.",
      },
    },
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Great_Mosque_of_Kairouan_Panorama_-_Grande_Mosqu%C3%A9e_de_Kairouan_Panorama.jpg",
    coordinates: { lat: 35.6813, lng: 10.1031 },
    id: 3,
  },
  {
    name: "Ruins of Carthage",
    description:
      "The remains of the great ancient city of Carthage, once the center of the Carthaginian Empire.",
    location: "Tunis, Tunisia",
    category: "Ancient Ruins",
    era: "814 BC - 146 BC",
    details: {
      history:
        "Founded by Phoenicians in the 9th century BC, it grew to become a major Mediterranean power before being destroyed by Rome in 146 BC.",
      architecture:
        "Includes the Antonine Baths, Tophet sanctuary, Byrsa Hill, and several residential quarters showing Punic and Roman influences.",
      significance:
        "One of the most important archaeological sites in the Mediterranean, designated a UNESCO World Heritage site in 1979.",
      visitorInfo: {
        openingHours: "8:30 AM - 5:30 PM (Winter), 8:00 AM - 7:00 PM (Summer)",
        admissionFees: "10 TND for a combined ticket to multiple sites",
        tips: "The site is spread out, so plan for at least half a day to explore properly.",
      },
    },
    imageUrl:
      "https://cdn.britannica.com/96/178496-050-CB365D03/Punic-ruins-Roman-Carthage-Tunisia.jpg",
    coordinates: { lat: 36.8525, lng: 10.3253 },
    id: 4,
  },
  {
    name: "Chenini",
    description:
      "An ancient Berber village built into the mountainside, featuring unique cave dwellings.",
    location: "Tataouine, Tunisia",
    category: "Berber Village",
    era: "12th century",
    details: {
      history:
        "Founded in the 12th century as a fortified granary and refuge from attacks.",
      architecture:
        "Features cave dwellings built into the cliff face and a distinctive white mosque perched on the hillside.",
      significance:
        "One of the best-preserved examples of traditional Berber mountain villages in Tunisia.",
      visitorInfo: {
        openingHours: "Daylight hours (sunrise to sunset)",
        admissionFees: "Free, but guides are available for hire (~30 TND)",
        tips: "Wear comfortable shoes for climbing the rocky paths to see the entire village.",
      },
    },
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Mosqu%C3%A9e_de_Chenini.jpg",
    coordinates: { lat: 32.9294, lng: 10.2624 },
    id: 5,
  },
  {
    name: "Medina of Tunis",
    description:
      "The historic heart of Tunis, featuring maze-like streets, traditional souks, and Islamic architecture.",
    location: "Tunis, Tunisia",
    category: "Historical City",
    era: "8th century onwards",
    details: {
      history:
        "Founded in the 8th century, it grew to become the political, cultural, and commercial center of Tunisia.",
      architecture:
        "Features narrow winding streets, covered bazaars, mosques, madrasas, and traditional houses with inner courtyards.",
      significance:
        "A UNESCO World Heritage site since 1979, it contains over 700 monuments including palaces, mosques, and fountains.",
      visitorInfo: {
        openingHours: "Open 24/7, but shops typically open 9:00 AM - 7:00 PM",
        admissionFees: "Free to enter, individual monuments may have fees",
        tips: "Visit Zitouna Mosque, the oldest in Tunis, and explore the traditional souks for handicrafts and spices.",
      },
    },
    imageUrl:
      "https://th.bing.com/th/id/OIP.ev4sikAe6K2JrvvOP85bvwAAAA?o=7&cb=iwp2rm=3&rs=1&pid=ImgDetMain",
    coordinates: { lat: 36.7992, lng: 10.1691 },
    id: 6,
  },
];
