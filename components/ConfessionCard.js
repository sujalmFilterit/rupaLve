'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MoveableNoButton from './Button';
import Modal from './Modal';
import CrackerBurst from './CrackerBurst';

export default function ConfessionCard() {
  const [showModal, setShowModal] = useState(false);
  const [particles, setParticles] = useState([]);

  const triggerCrackersAndModal = () => {
    triggerCrackerBurst();
    setShowModal(true);
  };

  const triggerCrackerBurst = () => {
    const newParticles = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ffd700', '#ffeb3b', '#fff', '#f8b4c4', '#e91e63', '#f06292', '#ff4081', '#ff80ab'];
    const types = ['ribbon', 'circle', 'star', 'sparkle'];

    const createBurst = (delay, count, spreadMultiplier) => {
      setTimeout(() => {
        const burst = [];
        for (let i = 0; i < count; i++) {
          const type = types[Math.floor(Math.random() * types.length)];
          const angle = Math.random() * Math.PI * 2;
          const velocity = 100 + Math.random() * 250;
          const dist = velocity * spreadMultiplier;
          const spread = 60;

          const tx = Math.cos(angle) * dist + (Math.random() - 0.5) * spread;
          const ty = Math.sin(angle) * dist + (Math.random() - 0.5) * spread;
          const rot = (Math.random() * 2 - 1) * 1080;

          burst.push({
            id: `${Date.now()}-${delay}-${i}`,
            type,
            centerX,
            centerY,
            tx,
            ty,
            rot,
            color: colors[Math.floor(Math.random() * colors.length)],
            startTime: Date.now(),
          });
        }
        setParticles((prev) => [...prev, ...burst]);
      }, delay);
    };

    createBurst(0, 80, 1);
    createBurst(100, 50, 1.2);
    createBurst(200, 40, 0.8);

    setTimeout(() => {
      setParticles([]);
    }, 3200);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <motion.div
          className="w-full max-w-lg"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-rose-200/50 p-8 md:p-10 backdrop-blur-lg bg-opacity-95">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gradient mb-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Will you be my Valentine...?? ❤️
              </motion.h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                You mean the world to me. Say yes and make my day — or try to catch the No button if you dare!
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <MoveableNoButton
                onYes={triggerCrackersAndModal}
                onNo={() => {}}
              />
            </motion.div>

            {/* Decorative hearts */}
            <motion.div
              className="flex justify-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {['💕', '❤️', '💗'].map((heart, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
                >
                  {heart}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Crackers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {particles.map((particle) => (
            <CrackerParticle key={particle.id} particle={particle} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

function CrackerParticle({ particle }) {
  const duration = particle.type === 'circle' ? 2.8 : particle.type === 'star' ? 2.6 : particle.type === 'sparkle' ? 2 : 2.5;

  return (
    <motion.div
      className="fixed"
      style={{
        left: particle.centerX,
        top: particle.centerY,
        width: particle.type === 'circle' ? '10px' : particle.type === 'sparkle' ? '6px' : '8px',
        height: particle.type === 'circle' ? '10px' : particle.type === 'sparkle' ? '6px' : '24px',
        borderRadius: (particle.type === 'circle' || particle.type === 'sparkle') ? '50%' : '2px',
        backgroundColor: particle.color,
      }}
      initial={{ x: 0, y: 0, scale: 0.3, rotate: 0, opacity: 1 }}
      animate={{
        x: particle.tx,
        y: particle.type === 'circle' ? particle.ty + 120 : particle.type === 'star' ? particle.ty + 90 : particle.type === 'sparkle' ? particle.ty + 80 : particle.ty + 100,
        scale: particle.type === 'circle' ? 1.2 : 1,
        rotate: particle.rot,
        opacity: 0,
      }}
      transition={{ duration, ease: 'easeOut' }}
    />
  );
}
