import React from "react";
import { motion } from "framer-motion";
import { FormData } from "@/pages/trip-planner";

interface BudgetStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const budgetRanges = [
  {
    id: "low:Less than 300 TND",
    label: "Budget-Friendly",
    range: "Less than 300 TND",
    emoji: "💰",
    description: "Essential experiences",
  },
  {
    id: "medium:300-600 TND",
    label: "Comfortable",
    range: "300-600 TND",
    emoji: "💸",
    description: "Good balance of activities",
  },
  {
    id: "high:More than 600 TND",
    label: "Premium",
    range: "More than 600 TND",
    emoji: "💎",
    description: "Luxury experiences",
  },
];

const BudgetStep: React.FC<BudgetStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-4">
      {budgetRanges.map((budget, index) => (
        <motion.div
          key={budget.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
            formData.budget === budget.id
              ? "border-orange-500 bg-orange-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-orange-300"
          }`}
          onClick={() => updateFormData("budget", budget.id)}
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="text-3xl">{budget.emoji}</div>
            <h3 className="font-semibold text-gray-800">{budget.label}</h3>
            <p className="text-orange-600 font-medium">{budget.range}</p>
            <p className="text-sm text-gray-600">{budget.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BudgetStep;
