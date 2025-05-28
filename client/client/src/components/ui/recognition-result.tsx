import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface RecognitionResultProps {
  result: any;
  isLoading: boolean;
}

export default function RecognitionResult({
  result,
  isLoading,
}: RecognitionResultProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md h-full">
        <Skeleton className="w-full h-64 rounded-xl mb-6" />
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mt-1 mr-2 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mt-1 mr-2 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mt-1 mr-2 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <Skeleton className="w-full h-10 rounded-lg mt-4" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-sand rounded-xl p-6 shadow-md h-full flex flex-col justify-center items-center text-center">
        <img
          src="https://cdn.pixabay.com/photo/2018/12/20/10/41/tunis-3885667_1280.jpg"
          alt="Sidi Bou Said village in Tunisia"
          className="rounded-xl shadow-md w-full h-64 object-cover mb-6"
        />
        <h3 className="text-xl font-bold font-el-messiri text-terracotta mb-3">
          Ready to Identify Monuments
        </h3>
        <p className="text-dark-brown/70 mb-4">
          Upload a photo of a Tunisian monument or landmark on the left to see
          our AI recognition in action.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          <div className="bg-terracotta/10 p-2 rounded-lg text-center">
            <p className="text-xs text-terracotta font-medium">FAST</p>
            <p className="text-sm">Results in seconds</p>
          </div>
          <div className="bg-azure-blue/10 p-2 rounded-lg text-center">
            <p className="text-xs text-azure-blue font-medium">ACCURATE</p>
            <p className="text-sm">High precision AI</p>
          </div>
          <div className="bg-olive-green/10 p-2 rounded-lg text-center">
            <p className="text-xs text-olive-green font-medium">DETAILED</p>
            <p className="text-sm">Rich information</p>
          </div>
        </div>
      </div>
    );
  }

  const { recognition } = result;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={recognition.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-md"
      >
        <img
          src={recognition.imageUrl}
          alt={recognition.name}
          className="rounded-xl shadow-md w-full h-64 object-cover mb-6 hover-card"
        />

        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-azure-blue rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-3.35-4.419 3.35A1 1 0 014 16V4zm5 0a1 1 0 10-2 0v4a1 1 0 102 0V4zm3 0a1 1 0 10-2 0v4a1 1 0 102 0V4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-azure-blue">{recognition.name}</h3>
            <div className="text-xs text-dark-brown/60 flex items-center">
              <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full text-xs font-medium mr-2">
                {recognition.confidence} match
              </span>
              {/* <span>4th Century</span> */}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
