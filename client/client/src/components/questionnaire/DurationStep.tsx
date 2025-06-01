import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/trip-planner";

interface DurationStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const durations = [
  {
    id: "one-day",
    label: "1 Day",
    emoji: "⚡",
    description: "Quick highlights tour",
  },
  {
    id: "short",
    label: "2-3 Days",
    emoji: "🌟",
    description: "Weekend getaway",
  },
  {
    id: "week",
    label: "1 Week",
    emoji: "🗓️",
    description: "Comprehensive exploration",
  },
  {
    id: "extended",
    label: "More than a week",
    emoji: "🌍",
    description: "Deep cultural immersion",
  },
];

const DurationStep: React.FC<DurationStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {durations.map((duration, index) => (
        <motion.div
          key={duration.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
            formData.duration === duration.id
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => updateFormData("duration", duration.id)}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{duration.emoji}</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {duration.label}
            </h3>
            <p className="text-sm text-gray-600">{duration.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DurationStep;
