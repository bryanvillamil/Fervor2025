import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const RegistroHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      {/* <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <a
          href="https://ipuc.org.co/"
          target="_blank"
          className="flex items-center gap-3"
        >
          {/* <img src="/logos.png" alt="Logo" className="h-10 w-auto" /> 
          <img src="/ipuc-logo.png" alt="Logo" className="h-32 w-auto" />
        </a>
      </div> */}
      <p className="text-2xl max-w-2xl mx-auto text-primary font-bold uppercase font-montserratBold">
        Legado Apostólico
      </p>
    </motion.div>
  );
};

export default RegistroHeader;
