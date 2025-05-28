import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/feature-card";
import PhotoUpload from "@/components/ui/photo-upload";
import RecognitionResult from "@/components/ui/recognition-result";
import { useState } from "react";
import { recognizeMonument } from "@/lib/monuments";
import { useToast } from "@/hooks/use-toast";

export default function FeatureSection() {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    try {
      setIsRecognizing(true);
      setRecognitionResult(null);

      const result = await recognizeMonument(file);

      setRecognitionResult(result);

      toast({
        title: "Recognition Complete",
        description: `Identified as ${result.monument.name} with ${result.recognition.confidence} confidence.`,
        variant: "default",
      });
    } catch (error) {
      let message = "Failed to process image";
      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: "Recognition Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsRecognizing(false);
    }
  };

  return (
    <section id="discover" className="relative py-16 lg:py-24 bg-white">
      <div
        className="absolute top-0 left-0 w-full h-16 bg-sand"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
      ></div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-lg text-dark-brown/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover Tunisian monuments with our simple AI-powered recognition
            system
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            title="Capture or Upload"
            description="Take a photo of a Tunisian monument or upload an existing image from your gallery."
            color="terracotta"
            delay={0.2}
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
            title="AI Recognition"
            description="Our AI instantly identifies the monument and provides accurate information."
            color="azure-blue"
            delay={0.4}
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            title="Explore Details"
            description="Learn about history, architecture, and cultural significance of each monument."
            color="olive-green"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}
