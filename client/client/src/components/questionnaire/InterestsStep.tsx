import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/trip-planner";

interface InterestsStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const interests = [
  {
    id: "historical",
    label: "Historical",
    emoji: "🏛️",
    description: "Ancient ruins and monuments",
  },
  {
    id: "religious",
    label: "Religious",
    emoji: "🕌",
    description: "Mosques and spiritual sites",
  },
  {
    id: "natural",
    label: "Natural",
    emoji: "🏞️",
    description: "Parks and landscapes",
  },
  {
    id: "cultural",
    label: "Cultural",
    emoji: "🎭",
    description: "Museums and heritage",
  },
  {
    id: "beaches",
    label: "Beaches",
    emoji: "🏖️",
    description: "Coastal areas and resorts",
  },
];

const InterestsStep: React.FC<InterestsStepProps> = ({
  formData,
  updateFormData,
}) => {
  const toggleInterest = (interestId: string) => {
    const currentInterests = formData.interests;
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter((id) => id !== interestId)
      : [...currentInterests, interestId];

    updateFormData("interests", updatedInterests);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interests.map((interest, index) => (
        <motion.div
          key={interest.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            formData.interests.includes(interest.id)
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => toggleInterest(interest.id)}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{interest.emoji}</div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {interest.label}
            </h3>
            <p className="text-sm text-gray-600">{interest.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InterestsStep;
