'use client';

import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const hearts = ['💕', '❤️', '💗', '💖'];
  const positions = [
    { left: '10%', top: '20%', delay: 0 },
    { left: '80%', top: '15%', delay: 1 },
    { left: '25%', top: '70%', delay: 2 },
    { left: '70%', top: '65%', delay: 0.5 },
    { left: '50%', top: '40%', delay: 1.5 },
    { left: '15%', top: '50%', delay: 2.5 },
    { left: '85%', top: '35%', delay: 0.8 },
    { left: '40%', top: '85%', delay: 1.2 },
    { left: '60%', top: '10%', delay: 2 },
    { left: '5%', top: '80%', delay: 1.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{ left: pos.left, top: pos.top }}
          animate={{
            y: [0, -20, 10, 5, 0],
            x: [0, 15, -5, 10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 6,
            delay: pos.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {hearts[i % hearts.length]}
        </motion.div>
      ))}
    </div>
  );
}
