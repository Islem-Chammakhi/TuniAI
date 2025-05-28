import { motion } from "framer-motion";

interface PatternBackgroundProps {
  className?: string;
}

export default function PatternBackground({ className = "" }: PatternBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      {/* Primary mosaic background */}
      <div className="absolute inset-0 mosaic-bg"></div>
      
      {/* Decorative floating patterns */}
      <div className="absolute inset-0">
        {/* Terracotta circle */}
        <motion.div 
          className="absolute h-48 w-48 rounded-full bg-terracotta/5 top-1/4 -left-24"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Azure circle */}
        <motion.div 
          className="absolute h-64 w-64 rounded-full bg-azure-blue/5 bottom-1/3 -right-32"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Olive green square */}
        <motion.div 
          className="absolute h-32 w-32 bg-olive-green/5 top-2/3 left-1/4 rounded-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Small decorative elements */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          {Array(10).fill(0).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-terracotta' : i % 3 === 1 ? 'bg-azure-blue' : 'bg-olive-green'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Decorative horizontal lines */}
        <div className="absolute left-0 right-0 top-1/4 h-px bg-terracotta/10"></div>
        <div className="absolute left-0 right-0 top-3/4 h-px bg-azure-blue/10"></div>
      </div>
    </div>
  );
}
