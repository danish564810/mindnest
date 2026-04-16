import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative', // ✅ FIX (important)
    width: '100%',
  },
  exit: (direction) => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
  }),
};

const AnimatedSlideWrapper = ({ children, currentKey, direction }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '300px', // ✅ IMPORTANT (set according to your modal)
      }}
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="wait"
      >
        <motion.div
          key={currentKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSlideWrapper;