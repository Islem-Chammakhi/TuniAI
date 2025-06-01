import { motion } from "framer-motion";
import PatternBackground from "@/components/ui/pattern-background";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About TunisiaAI - Discover Tunisian Heritage</title>
        <meta name="description" content="Learn about TunisiaAI, our mission to preserve and promote Tunisian cultural heritage, and how our AI technology helps tourists discover monuments and landmarks." />
        <meta property="og:title" content="About TunisiaAI - Discover Tunisian Heritage" />
        <meta property="og:description" content="Learn about our mission to preserve and promote Tunisian cultural heritage." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="relative">
        <PatternBackground />
        
        <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl lg:text-4xl font-bold font-el-messiri text-terracotta mb-4">
              About TunisiaAI
            </h1>
            <p className="text-lg text-dark-brown/70 max-w-2xl mx-auto">
              Our mission is to preserve and promote Tunisia's rich cultural heritage through technology and education
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#fff8eb] rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-4">Our Story</h2>
                <p className="text-dark-brown/80 mb-4">
                  TunisiaAI was born from a passion for Tunisia's extraordinary cultural heritage and a desire to make it more accessible to visitors from around the world. We recognized that while Tunisia is home to some of the world's most remarkable historical monuments, many tourists struggle to identify and understand these treasures.
                </p>

                <p className="text-dark-brown/80">
                  Our team has meticulously documented and cataloged Tunisia's monuments, from the well-known El Djem Amphitheater to hidden gems in remote regions, ensuring that visitors can discover and appreciate the full spectrum of Tunisia's cultural wealth.
                </p>
              </div>
              
              <div className="bg-[#fff8eb] rounded-xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-4">Our Technology</h2>
                <p className="text-dark-brown/80 mb-4">
                  At the heart of TunisiaAI is our proprietary monument recognition system. our technology can identify Tunisian monuments from user photos with remarkable accuracy.
                </p>

                <p className="text-dark-brown/80">
                  Beyond simple identification, our platform provides comprehensive information about each monument, including historical context, architectural details, cultural significance, and practical visitor information.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-[#fff8eb] rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-4">Our Mission</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-terracotta/10 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Preservation Through Education</h3>
                      <p className="text-dark-brown/80">
                        By educating visitors about Tunisia's monuments, we hope to inspire a deep respect for these irreplaceable treasures.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-azure-blue/10 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-azure-blue" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cultural Access for All</h3>
                      <p className="text-dark-brown/80">
                        We're committed to making Tunisia's rich cultural heritage accessible to everyone, regardless of background or expertise.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-olive-green/10 rounded-full p-2 mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-olive-green" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Supporting Local Tourism</h3>
                      <p className="text-dark-brown/80">
                        By highlighting lesser-known monuments and providing practical visitor information, we aim to encourage tourism across all regions of Tunisia.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              
              <div className="bg-[#fff8eb] rounded-xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold font-el-messiri text-terracotta mb-4">Get Involved</h2>
                <p className="text-dark-brown/80 mb-6">
                  We welcome collaboration from researchers, historians, photographers, and anyone passionate about Tunisian heritage. Here's how you can contribute:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dark-brown/80">Share your monument photos to help improve our recognition system</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dark-brown/80">Contribute historical information or corrections to our database</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dark-brown/80">Help translate our content into additional languages</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-dark-brown/80">Partner with us for research or educational initiatives</span>
                  </div>
                </div>
                
                <button className="mt-6 px-6 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta/90 transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contact Our Team</span>
                </button>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </>
  );
}
