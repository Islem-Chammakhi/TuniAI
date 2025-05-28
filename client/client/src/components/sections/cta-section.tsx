import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 relative bg-terracotta text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold font-el-messiri mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Discover Tunisia's Hidden Treasures with AI
          </motion.h2>
          <motion.p 
            className="text-white/80 text-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Start your journey through Tunisia's rich heritage today. Upload photos, identify monuments, and explore the history and culture of this beautiful North African country.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/discover">
              <Button className="px-8 py-6 rounded-full bg-white text-terracotta font-medium hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Try It Now</span>
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="px-8 py-6 rounded-full border-2 border-white/70 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Learn More</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-white/90">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-white/70">Monuments</div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-white/20"></div>
            <div className="text-white/90">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-white/70">Accuracy</div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-white/20"></div>
            <div className="text-white/90">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-white/70">Users</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
