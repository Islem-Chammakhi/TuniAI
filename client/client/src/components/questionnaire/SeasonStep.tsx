import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/TravelQuestionnaire";

interface SeasonStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const seasons = [
  {
    id: "summer",
    label: "Summer",
    emoji: "☀️",
    description: "Hot and sunny weather",
    temp: "25-35°C",
  },
  {
    id: "winter",
    label: "Winter",
    emoji: "❄️",
    description: "Mild and comfortable",
    temp: "10-20°C",
  },
  {
    id: "spring",
    label: "Spring",
    emoji: "🌸",
    description: "Pleasant and blooming",
    temp: "15-25°C",
  },
  {
    id: "autumn",
    label: "Autumn",
    emoji: "🍂",
    description: "Warm and colorful",
    temp: "18-28°C",
  },
];

const SeasonStep: React.FC<SeasonStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {seasons.map((season, index) => (
        <motion.div
          key={season.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            formData.season === season.id
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => updateFormData("season", season.id)}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{season.emoji}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{season.label}</h3>
            <p className="text-sm text-gray-600 mb-1">{season.description}</p>
            <span className="text-xs text-orange-600 font-medium">
              {season.temp}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SeasonStep;
