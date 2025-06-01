import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/TravelQuestionnaire";

interface TransportStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const transportOptions = [
  {
    id: "car",
    label: "Car Rental",
    emoji: "🚗",
    description: "Freedom to explore at your pace",
  },
  {
    id: "public",
    label: "Public Transport",
    emoji: "🚌",
    description: "Affordable and local experience",
  },
  {
    id: "guide",
    label: "Private Guide",
    emoji: "🧑‍✈️",
    description: "Personalized tours with expert knowledge",
  },
  {
    id: "mixed",
    label: "Mix of Options",
    emoji: "🎯",
    description: "Combine different transport modes",
  },
];

const TransportStep: React.FC<TransportStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {transportOptions.map((transport, index) => (
        <motion.div
          key={transport.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            formData.transport === transport.id
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => updateFormData("transport", transport.id)}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{transport.emoji}</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {transport.label}
            </h3>
            <p className="text-sm text-gray-600">{transport.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TransportStep;
