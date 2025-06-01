import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Wallet, Car, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormData } from "@/pages/TravelQuestionnaire";

interface TravelResultProps {
  formData: FormData;
  onStartOver: () => void;
  data: any;
}

const TravelResult: React.FC<TravelResultProps> = ({
  formData,
  onStartOver,
  data,
}) => {
  // Generate AI suggestion based on form data
  const generateSuggestion = () => {
    const suggestions = {
      historical: {
        name: "Carthage Archaeological Site",
        description:
          "Explore the ancient ruins of the mighty Carthaginian empire with stunning Mediterranean views.",
        image:
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
        highlights: ["Ancient Roman Baths", "Punic Ports", "National Museum"],
      },
      religious: {
        name: "Great Mosque of Kairouan",
        description:
          "Discover the spiritual heart of Tunisia in this UNESCO World Heritage sacred city.",
        image:
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
        highlights: [
          "Historic Medina",
          "Aghlabid Basins",
          "Carpet Weaving Workshops",
        ],
      },
      natural: {
        name: "Chott el Djerid Salt Lake",
        description:
          "Marvel at the otherworldly landscapes of Tunisia's largest salt lake in the Sahara.",
        image:
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
        highlights: [
          "Desert Oasis",
          "Mirages & Salt Formations",
          "Sunset Views",
        ],
      },
      cultural: {
        name: "Sidi Bou Said",
        description:
          "Wander through the iconic blue and white village overlooking the Mediterranean.",
        image:
          "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
        highlights: [
          "Traditional Architecture",
          "Art Galleries",
          "Café des Nattes",
        ],
      },
      beaches: {
        name: "Hammamet Beach Resort",
        description:
          "Relax on pristine sandy beaches with crystal-clear waters and luxury amenities.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        highlights: ["Water Sports", "Spa Treatments", "Beachfront Dining"],
      },
    };

    // Select suggestion based on primary interest
    const primaryInterest = formData.interests[0] || "cultural";
    return (
      suggestions[primaryInterest as keyof typeof suggestions] ||
      suggestions.cultural
    );
  };

  const getBudgetDisplay = () => {
    switch (formData.budget) {
      case "low":
        return "200-300 TND";
      case "medium":
        return "400-600 TND";
      case "high":
        return "700+ TND";
      default:
        return "300-500 TND";
    }
  };

  const getTransportDisplay = () => {
    switch (formData.transport) {
      case "car":
        return "Car Rental";
      case "public":
        return "Public Transport";
      case "guide":
        return "Private Guide";
      case "mixed":
        return "Mixed Transport";
      default:
        return "Flexible Options";
    }
  };

  const getDurationDisplay = () => {
    switch (formData.duration) {
      case "one-day":
        return "1 Day Trip";
      case "short":
        return "2-3 Days";
      case "week":
        return "1 Week";
      case "extended":
        return "1+ Week";
      default:
        return "3-5 Days";
    }
  };

  const suggestion = generateSuggestion();

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Star className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Your Perfect Tunisia Adventure
          </h1>
          <p className="text-lg text-gray-600">
            Based on your preferences, we've crafted the ideal journey for you
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="overflow-hidden bg-white/95 backdrop-blur-sm border-orange-200/50 shadow-2xl">
            {/* Destination Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={suggestion.image}
                alt={data?.destination}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {data?.destination}
                </h2>
                <p className="text-lg opacity-90">{data?.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Key Details Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-800">
                      {suggestion.name.split(" ")[0]}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-800">
                      {getDurationDisplay()}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-gray-800">
                      {data?.estimated_cost || getBudgetDisplay()}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transport</p>
                    <p className="font-semibold text-gray-800">
                      {getTransportDisplay()}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  What You'll Experience
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {data?.highlights.map((highlight: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                      className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100"
                    >
                      <p className="font-medium text-gray-800">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Activities
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.isArray(data?.itinerary) &&
                    data.itinerary.map((dayItem: any, dayIdx: number) => (
                      <motion.div
                        key={dayIdx}
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 1.3 + dayIdx * 0.15,
                          duration: 0.5,
                          type: "spring",
                        }}
                        className="rounded-2xl shadow-xl bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200/60 p-6 flex flex-col gap-3 hover:shadow-2xl transition-shadow duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-200 text-orange-700 rounded-full font-bold text-lg shadow">
                            {dayItem.day}
                          </span>
                          <span className="text-lg font-semibold text-orange-700">
                            {dayItem.location}
                          </span>
                        </div>
                        <ul className="pl-2 flex flex-col gap-2">
                          {Array.isArray(dayItem.activities) &&
                            dayItem.activities.map(
                              (activity: string, actIdx: number) => (
                                <motion.li
                                  key={actIdx}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 1.4 + dayIdx * 0.15 + actIdx * 0.07,
                                    duration: 0.3,
                                  }}
                                  className="flex items-center gap-2 text-gray-700 bg-white/80 rounded-lg px-3 py-2 shadow-sm border border-orange-100"
                                >
                                  <span className="w-2 h-2 bg-orange-400 rounded-full inline-block"></span>
                                  <span>{activity}</span>
                                </motion.li>
                              )
                            )}
                        </ul>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
              {/* Tips Section */}
              {data?.tips && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="mb-8 flex justify-center"
                >
                  <div className="max-w-2xl w-full bg-gradient-to-r from-orange-100 via-amber-50 to-orange-50 border border-orange-200/60 rounded-2xl shadow-lg px-6 py-5 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-200 text-orange-700 rounded-full font-bold text-xl shadow mr-2">
                      💡
                    </span>
                    <span className="text-lg text-gray-800 font-medium">
                      {data.tips}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onStartOver}
                  className="bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Start Over
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelResult;
