import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getMonumentById, getMonuments } from "@/lib/monuments";
import { X, Map, GalleryThumbnails, Compass, Share, AlertTriangle } from "lucide-react";

interface MonumentDetailViewProps {
  monumentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MonumentDetailView({ 
  monumentId, 
  isOpen, 
  onClose 
}: MonumentDetailViewProps) {
  const [relatedMonuments, setRelatedMonuments] = useState<any[]>([]);

  // Fetch monument details
  const { data: monument, isLoading, error } = useQuery({
    queryKey: ['/api/monuments', monumentId],
    enabled: monumentId !== null && isOpen
  });

  // Fetch all monuments to get related ones
  const { data: allMonuments } = useQuery({
    queryKey: ['/api/monuments'],
    enabled: monumentId !== null && isOpen,
    staleTime: 300000 // 5 minutes
  });

  // Get related monuments when monument data is available
  useEffect(() => {
    if (monument && allMonuments) {
      const related = allMonuments
        .filter((m: any) => m.id !== monument.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setRelatedMonuments(related);
    }
  }, [monument, allMonuments]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-dark-brown/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-terracotta/20 border-t-terracotta rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark-brown/70">Loading monument details...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Failed to load monument details</h3>
                <p className="text-dark-brown/70 mb-4">Please try again later</p>
                <Button variant="outline" onClick={onClose}>Close</Button>
              </div>
            ) : monument ? (
              <>
                <div className="relative">
                  <img 
                    src={monument.imageUrl}
                    alt={monument.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  
                  <button 
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5 text-dark-brown" />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark-brown/80 to-transparent p-6">
                    <h2 className="text-3xl font-bold font-el-messiri text-white">{monument.name}</h2>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-white/90 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{monument.location}</span>
                      </div>
                      <span className="mx-3 text-white/50">•</span>
                      <span className="bg-terracotta/80 text-white text-xs px-2 py-1 rounded-full">{monument.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Button className="px-4 py-2 rounded-lg bg-terracotta text-white flex items-center">
                      <GalleryThumbnails className="h-4 w-4 mr-2" />
                      <span>View GalleryThumbnails</span>
                    </Button>
                    <Button className="px-4 py-2 rounded-lg bg-azure-blue text-white flex items-center">
                      <Map className="h-4 w-4 mr-2" />
                      <span>View on Map</span>
                    </Button>
                    <Button className="px-4 py-2 rounded-lg bg-olive-green text-white flex items-center">
                      <Compass className="h-4 w-4 mr-2" />
                      <span>Directions</span>
                    </Button>
                    <Button variant="outline" className="px-4 py-2 rounded-lg bg-sand text-dark-brown flex items-center">
                      <Share className="h-4 w-4 mr-2" />
                      <span>Share</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">About</h3>
                      <p className="text-dark-brown/80">
                        {monument.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">History & Architecture</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-azure-blue mb-2">Historical Timeline</h4>
                          <p className="text-sm text-dark-brown/80">
                            {monument.details.history}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-azure-blue mb-2">Key Architectural Features</h4>
                          <p className="text-sm text-dark-brown/80">
                            {monument.details.architecture}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">Visitor Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-olive-green mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Opening Hours</h4>
                              <p className="text-sm text-dark-brown/80">
                                {monument.details.visitorInfo.openingHours}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-olive-green mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Admission Fees</h4>
                              <p className="text-sm text-dark-brown/80">
                                {monument.details.visitorInfo.admissionFees}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-olive-green mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Visitor Tips</h4>
                              <p className="text-sm text-dark-brown/80">
                                {monument.details.visitorInfo.tips}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-olive-green mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Getting There</h4>
                              <p className="text-sm text-dark-brown/80">
                                Located in {monument.location}, Tunisia
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Related monuments */}
                  {relatedMonuments.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-xl font-semibold font-el-messiri text-terracotta mb-4">You Might Also Like</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {relatedMonuments.map((relatedMonument: any) => (
                          <div 
                            key={relatedMonument.id}
                            className="bg-sand rounded-lg overflow-hidden hover-card cursor-pointer"
                            onClick={() => {
                              onClose();
                              // A small delay to allow the current modal to close
                              setTimeout(() => {
                                window.location.href = `/monuments/${relatedMonument.id}`;
                              }, 300);
                            }}
                          >
                            <img 
                              src={relatedMonument.imageUrl}
                              alt={relatedMonument.name}
                              className="w-full h-28 object-cover"
                            />
                            <div className="p-3">
                              <h4 className="font-medium text-terracotta">{relatedMonument.name}</h4>
                              <div className="flex items-center text-xs text-dark-brown/60 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{relatedMonument.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Monument Not Found</h3>
                <p className="text-dark-brown/70 mb-4">The monument you're looking for could not be found.</p>
                <Button variant="outline" onClick={onClose}>Close</Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
