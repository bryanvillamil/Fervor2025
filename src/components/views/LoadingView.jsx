import React from 'react';
import { motion } from 'framer-motion';

const LoadingView = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingView;