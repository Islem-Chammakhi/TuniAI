import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/TravelQuestionnaire";

interface DepartureCityStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const cities = [
  { id: "tunis", label: "Tunis", emoji: "🏛️", description: "Capital city" },
  { id: "sousse", label: "Sousse", emoji: "🏖️", description: "Coastal city" },
  { id: "sfax", label: "Sfax", emoji: "🏭", description: "Industrial hub" },
  { id: "kairouan", label: "Kairouan", emoji: "🕌", description: "Holy city" },
  {
    id: "monastir",
    label: "Monastir",
    emoji: "✈️",
    description: "Tourist destination",
  },
  {
    id: "other",
    label: "Other",
    emoji: "📍",
    description: "Different location",
  },
];

const DepartureCityStep: React.FC<DepartureCityStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
          💡 This helps us suggest the best routes and nearby attractions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              formData.departureCity === city.id
                ? "border-orange-500 bg-orange-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-orange-300"
            }`}
            onClick={() => updateFormData("departureCity", city.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{city.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{city.label}</h3>
                <p className="text-sm text-gray-600">{city.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DepartureCityStep;
