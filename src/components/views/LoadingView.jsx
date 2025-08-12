import React from 'react';
import { motion } from 'framer-motion';

const LoadingView = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 border-4 border-primary border-t-secondary rounded-full"
      />
    </div>
  );
};

export default LoadingView;