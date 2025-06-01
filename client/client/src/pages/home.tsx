import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero-section";
import FeatureSection from "@/components/sections/feature-section";
import GallerySection from "@/components/sections/gallery-section";
import PatternSection from "@/components/sections/pattern-section";
import PatternBackground from "@/components/ui/pattern-background";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TuniTales</title>
        <meta
          name="description"
          content="Explore Tunisia's rich cultural monuments and landmarks with our intelligent recognition system. Capture, learn, and immerse yourself in the beauty of Tunisian heritage."
        />
        <meta
          property="og:title"
          content="TuniTales - Discover Tunisian Monuments"
        />
        <meta
          property="og:description"
          content="Explore Tunisia's rich cultural monuments and landmarks with our intelligent recognition system."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-x-hidden">
          <PatternBackground />
          <HeroSection />
          <FeatureSection />
          <GallerySection />
          <PatternSection />
        </div>
      </motion.div>
    </>
  );
}
