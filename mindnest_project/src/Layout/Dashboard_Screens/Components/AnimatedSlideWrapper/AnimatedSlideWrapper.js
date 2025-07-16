import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute', // Needed during enter
  }),
  center: { 
    x: '0%', 
    opacity: 1, 
    position: 'static'  // <-- This is the fix: no absolute when centered
  },
  exit: (direction) => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
    position: 'absolute',  // Needed during exit
  }),
};;

const AnimatedSlideWrapper = ({ children, currentKey, direction }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentKey}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSlideWrapper;
