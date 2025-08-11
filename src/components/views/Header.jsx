import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      {/* <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-brand-400 to-brand-600 p-4 rounded-full">
          <Heart className="w-12 h-12 text-white" />
        </div>
      </div> */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-300 via-brand-500 to-brand-700 bg-clip-text text-[#7D0F08]">
        Fervor 2025
      </h1>
      <p className="text-xl text-white/80 max-w-2xl mx-auto">
        Un encuentro transformador donde Dios toca corazones y vidas
      </p>
    </motion.div>
  );
};

export default Header;