import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Wallet,
  Car,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import InterestsStep from "@/components/questionnaire/InterestsStep";
import SeasonStep from "@/components/questionnaire/SeasonStep";
import BudgetStep from "@/components/questionnaire/BudgetStep";
import TransportStep from "@/components/questionnaire/TransportStep";
import DurationStep from "@/components/questionnaire/DurationStep";
import DepartureCityStep from "@/components/questionnaire/DepartureCityStep";
import TravelResult from "@/components/questionnaire/TravelResult";
import axios from "@/lib/axios";

export interface FormData {
  interests: string[];
  season: string;
  budget: string;
  transport: string;
  duration: string;
  departureCity: string;
}

const TravelQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    interests: [],
    season: "",
    budget: "",
    transport: "",
    duration: "",
    departureCity: "",
  });

  const steps = [
    {
      id: "interests",
      title: "What interests you?",
      subtitle: "Choose the types of places you love to explore",
      icon: MapPin,
      component: InterestsStep,
    },
    {
      id: "season",
      title: "When do you prefer to visit?",
      subtitle: "Select your ideal travel season",
      icon: Calendar,
      component: SeasonStep,
    },
    {
      id: "budget",
      title: "What's your budget?",
      subtitle: "Choose your comfortable spending range",
      icon: Wallet,
      component: BudgetStep,
    },
    {
      id: "transport",
      title: "How do you like to travel?",
      subtitle: "Select your preferred mode of transportation",
      icon: Car,
      component: TransportStep,
    },
    {
      id: "duration",
      title: "How long is your trip?",
      subtitle: "Tell us about your travel duration",
      icon: Clock,
      component: DurationStep,
    },
    {
      id: "departure",
      title: "Where are you starting from?",
      subtitle: "Choose your departure city (optional)",
      icon: User,
      component: DepartureCityStep,
    },
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post("planner_trip", formData);
      console.log(response.data);
      setResult(response.data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const startOver = () => {
    setShowResult(false);
    setCurrentStep(0);
    setFormData({
      interests: [],
      season: "",
      budget: "",
      transport: "",
      duration: "",
      departureCity: "",
    });
  };

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;
  const Icon = currentStepData.icon;

  const isStepValid = () => {
    switch (currentStepData.id) {
      case "interests":
        return formData.interests.length > 0;
      case "season":
        return formData.season !== "";
      case "budget":
        return formData.budget !== "";
      case "transport":
        return formData.transport !== "";
      case "duration":
        return formData.duration !== "";
      case "departure":
        return true; // Optional step
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {!showResult && (
              <div className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress Bar */}
            <div className="bg-white/50 py-4">
              <div className="container mx-auto px-4">
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                          index <= currentStep
                            ? "bg-terracotta text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-terracotta h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  <Card className="p-8 bg-white/90 backdrop-blur-sm border-orange-200/50 shadow-xl">
                    {/* Step Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                        <Icon className="w-8 h-8 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {currentStepData.title}
                      </h2>
                      <p className="text-gray-600">
                        {currentStepData.subtitle}
                      </p>
                    </div>

                    {/* Step Content */}
                    <StepComponent
                      formData={formData}
                      updateFormData={updateFormData}
                    />

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-8 py-6  bg-terracotta text-white font-medium hover:bg-background hover:text-terracotta hover:border-terracotta  transition-all shadow-md flex items-center justify-center space-x-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </Button>

                      <Button
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        variant="outline"
                        className="px-8 py-6  border-azure-blue text-azure-blue font-medium hover:bg-azure-blue hover:text-white transition-all flex items-center justify-center space-x-2"
                      >
                        <span>
                          {currentStep === steps.length - 1 ? "Submit" : "Next"}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <TravelResult
            formData={formData}
            onStartOver={startOver}
            data={result}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TravelQuestionnaire;
