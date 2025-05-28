import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MonumentCard from "@/components/ui/monument-card";
import MonumentDetailView from "@/components/ui/monument-detail-view";
import { getMonuments, monumentCategories } from "@/lib/monuments";
import { Skeleton } from "@/components/ui/skeleton";
import { Monument } from "@shared/schema";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All Monuments");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedMonumentId, setSelectedMonumentId] = useState<number | null>(
    null
  );
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMonuments() {
      try {
        setIsLoading(true);
        const data = await getMonuments();
        setMonuments(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load monuments")
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMonuments();
  }, []);

  const filteredMonuments = monuments
    ? selectedCategory === "All Monuments"
      ? monuments
      : monuments.filter((m: any) => m.category === selectedCategory)
    : [];

  const displayMonuments = filteredMonuments.slice(
    0,
    Math.min(visibleCount, filteredMonuments.length)
  );

  const handleMonumentClick = (id: number) => {
    setSelectedMonumentId(id);
    setIsDetailViewOpen(true);
  };

  const closeDetailView = () => {
    setIsDetailViewOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="monuments" className="py-16 lg:py-24 relative">
      <div className="absolute inset-0 mosaic-bg"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4">
            Discover Tunisian Monuments
          </h2>
          <p className="text-lg text-dark-brown/70 max-w-2xl mx-auto">
            Explore the most iconic landmarks and monuments of Tunisia's rich
            heritage
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex overflow-x-auto scrollbar-hidden py-4 mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-5 w-1/4 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-5/6 mt-1" />
                  <div className="mt-4 flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {displayMonuments.map((monument: any) => (
              <motion.div key={monument.id} variants={itemVariants}>
                <MonumentCard monument={monument} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredMonuments.length > visibleCount && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
        )}

        {/* View All Link */}
        {!isLoading && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          ></motion.div>
        )}
      </div>

      {/* Monument Detail Modal */}
      <MonumentDetailView
        monumentId={selectedMonumentId}
        isOpen={isDetailViewOpen}
        onClose={closeDetailView}
      />
    </section>
  );
}
