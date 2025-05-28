import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "terracotta" | "azure-blue" | "olive-green";
  delay?: number;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  color = "terracotta",
  delay = 0
}: FeatureCardProps) {
  // Color mappings
  const colorMap = {
    "terracotta": {
      bg: "bg-terracotta/10",
      text: "text-terracotta",
    },
    "azure-blue": {
      bg: "bg-azure-blue/10",
      text: "text-azure-blue",
    },
    "olive-green": {
      bg: "bg-olive-green/10",
      text: "text-olive-green",
    }
  };

  const selectedColor = colorMap[color];

  return (
    <motion.div 
      className="bg-sand rounded-2xl p-6 hover-card"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`w-16 h-16 ${selectedColor.bg} rounded-full flex items-center justify-center ${selectedColor.text} mb-6`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold font-el-messiri ${selectedColor.text} mb-3`}>
        {title}
      </h3>
      <p className="text-dark-brown/80">
        {description}
      </p>
    </motion.div>
  );
}
