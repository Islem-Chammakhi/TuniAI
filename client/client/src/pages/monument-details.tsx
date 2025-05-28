import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMonumentById, getMonuments } from "@/lib/monumentsService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertTriangle, GalleryThumbnails, Map, Compass, Share } from "lucide-react";
import { Helmet } from "react-helmet";
import { Monument } from "../types/monument";

export default function MonumentDetails() {
  const { id } = useParams();
  const monumentId = parseInt(id);
  
  const [monument, setMonument] = useState<Monument | null>(null);
  const [relatedMonuments, setRelatedMonuments] = useState<Monument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function loadMonumentDetails() {
      if (isNaN(monumentId)) return;
      
      try {
        setIsLoading(true);
        const monumentData = await getMonumentById(monumentId);
        setMonument(monumentData);
        
        // Load all monuments for related suggestions
        const allMonuments = await getMonuments();
        setRelatedMonuments(allMonuments);
        
        setError(null);
      } catch (err) {
        console.error("Error loading monument details:", err);
        setError(err instanceof Error ? err : new Error('Failed to load monument details'));
      } finally {
        setIsLoading(false);
      }
    }
    
    loadMonumentDetails();
  }, [monumentId]);
  
  if (isNaN(monumentId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Invalid Monument ID</h1>
          <p className="mb-4">The monument ID provided is not valid.</p>
          <Link href="/monuments">
            <Button className="bg-terracotta hover:bg-terracotta/90">
              Back to Monuments
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get 3 related monuments (different from current)
  const getRelatedMonuments = () => {
    if (!relatedMonuments || !monument) return [];
    
    return relatedMonuments
      .filter((m: any) => m.id !== monument.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };

  return (
    <>
      {monument && (
        <Helmet>
          <title>{monument.name} - TunisiaAI</title>
          <meta name="description" content={monument.description} />
          <meta property="og:title" content={`${monument.name} - TunisiaAI`} />
          <meta property="og:description" content={monument.description} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={monument.imageUrl} />
        </Helmet>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="max-w-4xl mx-auto my-8 px-4">
            <Skeleton className="w-full h-64 md:h-80 rounded-t-2xl" />
            <div className="p-6 bg-white rounded-b-2xl shadow-lg">
              <Skeleton className="h-10 w-2/3 mb-4" />
              <div className="flex flex-wrap gap-4 mb-8">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
              </div>
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-32 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h1 className="text-2xl font-bold mb-2">Failed to Load Monument</h1>
              <p className="mb-4">We couldn't load the details for this monument.</p>
              <Link href="/monuments">
                <Button className="bg-terracotta hover:bg-terracotta/90">
                  Back to Monuments
                </Button>
              </Link>
            </div>
          </div>
        ) : monument ? (
          <div className="bg-background min-h-screen">
            <div className="relative">
              <img 
                src={monument.imageUrl}
                alt={monument.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              <Link href="/monuments">
                <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Link>
              
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-dark-brown/80 to-transparent p-6">
                <h1 className="text-3xl font-bold font-el-messiri text-white">{monument.name}</h1>
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
            
            <div className="max-w-4xl mx-auto bg-white rounded-b-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="flex items-center gap-2 bg-terracotta hover:bg-terracotta/90">
                  <GalleryThumbnails className="h-4 w-4" />
                  <span>View GalleryThumbnails</span>
                </Button>
                <Button className="flex items-center gap-2 bg-azure-blue hover:bg-azure-blue/90">
                  <Map className="h-4 w-4" />
                  <span>View on Map</span>
                </Button>
                <Button className="flex items-center gap-2 bg-olive-green hover:bg-olive-green/90">
                  <Compass className="h-4 w-4" />
                  <span>Directions</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-sand text-dark-brown border-dark-brown/20">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">About</h2>
                  <p className="text-dark-brown/80">
                    {monument.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">History & Architecture</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-azure-blue mb-2">Historical Timeline</h3>
                      <p className="text-sm text-dark-brown/80">
                        {monument.details.history}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-azure-blue mb-2">Key Architectural Features</h3>
                      <p className="text-sm text-dark-brown/80">
                        {monument.details.architecture}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold font-el-messiri text-terracotta mb-3">Visitor Information</h2>
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
                
                {/* Related monuments */}
                {relatedMonuments && relatedMonuments.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-xl font-semibold font-el-messiri text-terracotta mb-4">You Might Also Like</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {getRelatedMonuments().map((relatedMonument: any) => (
                        <Link key={relatedMonument.id} href={`/monuments/${relatedMonument.id}`}>
                          <div className="bg-sand rounded-lg overflow-hidden hover-card cursor-pointer">
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
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </>
  );
}
