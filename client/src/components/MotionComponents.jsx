import React from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent } from '@mui/material';

// Fade in animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

// Animated Box component
export const AnimatedBox = ({ children, ...props }) => (
  <motion.div
    initial='initial'
    animate='animate'
    exit='exit'
    variants={fadeInUp}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </motion.div>
);

// Animated Card component
export const AnimatedCard = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.5,
      delay: delay * 0.1,
      ease: 'easeOut',
    }}
    whileHover={{
      y: -8,
      transition: { duration: 0.2 },
    }}
    {...props}
  >
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 20px 40px rgba(0,0,0,0.12)'
              : '0 20px 40px rgba(0,0,0,0.4)',
        },
      }}
    >
      {children}
    </Card>
  </motion.div>
);

// Animated Grid Item
export const AnimatedGridItem = ({ children, index = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: index * 0.1,
      ease: 'easeOut',
    }}
    whileHover={{
      y: -4,
      transition: { duration: 0.2 },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Loading animation
export const LoadingAnimation = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

// Page transition wrapper
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Floating animation for icons
export const FloatingIcon = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      delay: delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

// Pulse animation for buttons
export const PulseButton = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered list animation
export const StaggeredList = ({ children }) => (
  <motion.div variants={staggerContainer} initial='initial' animate='animate'>
    {children}
  </motion.div>
);

// Staggered list item
export const StaggeredListItem = ({ children, index = 0 }) => (
  <motion.div variants={fadeInUp} transition={{ delay: index * 0.1 }}>
    {children}
  </motion.div>
);
