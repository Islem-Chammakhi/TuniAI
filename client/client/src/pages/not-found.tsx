import { Card, CardContent } from "@/components/ui/card";
import PatternBackground from "@/components/ui/pattern-background";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex items-center justify-center bg-sand relative"
    >
      <div className="absolute inset-0 z-0">
        <PatternBackground />
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: -40, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.2
        }}
        className="relative z-10 transform -translate-y-10"
      >
        <Card className="w-full max-w-lg mx-4 bg-[#fff8eb]">
          <CardContent className="pt-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex mb-4 gap-2"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                <AlertCircle className="h-8 w-8 text-red-500" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-sm text-gray-600"
            >
              Page does not exist or is not loaded correctly.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}