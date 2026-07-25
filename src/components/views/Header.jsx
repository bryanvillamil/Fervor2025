import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { getCurrentYear } from '@/lib/utils';

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
      <h1 className="mb-4 font-bebasNeue text-5xl uppercase tracking-wide text-primary md:text-7xl">
        Fervor {getCurrentYear()}
      </h1>
      <p className="mx-auto max-w-2xl text-xl font-montserratMedium text-secondary">
        Identidad Celestial
      </p>
    </motion.div>
  );
};

export default Header;
