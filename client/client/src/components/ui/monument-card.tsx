import { motion } from "framer-motion";
import type { Monument } from "../../types/monument";

interface MonumentCardProps {
  monument: Monument;
}

export default function MonumentCard({ monument }: MonumentCardProps) {
  return (
    <motion.div
      className="bg-[#fff8eb] rounded-xl shadow-md overflow-hidden hover-card cursor-pointer"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative">
        <img
          src={monument.imageUrl}
          alt={monument.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-bold font-el-messiri text-terracotta text-xl">
            {monument.name}
          </h3>
          <span className="bg-azure-blue/10 text-azure-blue text-xs px-2 py-1 rounded-full">
            {monument.category}
          </span>
        </div>
        <p className="mt-2 text-dark-brown/70 text-sm line-clamp-2">
          {monument.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-xs text-dark-brown/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{monument.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
