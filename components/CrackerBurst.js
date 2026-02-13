'use client';

import { useEffect, useState } from 'react';

export default function CrackerBurst() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles([]);
    }, 3200);

    return () => clearTimeout(timer);
  }, [particles]);

  const triggerBurst = () => {
    const newParticles = [];
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ffd700', '#ffeb3b', '#fff', '#f8b4c4', '#e91e63', '#f06292'];
    const types = ['ribbon', 'circle', 'star', 'sparkle'];

    const createBurst = (delay, count, spreadMultiplier) => {
      setTimeout(() => {
        for (let i = 0; i < count; i++) {
          const type = types[Math.floor(Math.random() * types.length)];
          const angle = Math.random() * Math.PI * 2;
          const velocity = 100 + Math.random() * 250;
          const dist = velocity * spreadMultiplier;
          const spread = 60;

          const tx = Math.cos(angle) * dist + (Math.random() - 0.5) * spread;
          const ty = Math.sin(angle) * dist + (Math.random() - 0.5) * spread;
          const rot = (Math.random() * 2 - 1) * 1080;

          newParticles.push({
            id: `${delay}-${i}`,
            type,
            centerX,
            centerY,
            tx,
            ty,
            rot,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        setParticles((prev) => [...prev, ...newParticles.slice(-count)]);
      }, delay);
    };

    createBurst(0, 80, 1);
    createBurst(100, 50, 1.2);
    createBurst(200, 40, 0.8);
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
      <button
        onClick={triggerBurst}
        className="fixed bottom-10 right-10 px-4 py-2 bg-rose-500 text-white rounded-full text-sm hover:bg-rose-600 transition-colors"
      >
        Test Burst
      </button>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <Particle key={particle.id} particle={particle} />
        ))}
      </div>
    </>
  );
}

function Particle({ particle }) {
  const animationStyle = {
    left: `${particle.centerX}px`,
    top: `${particle.centerY}px`,
    '--tx': `${particle.tx}px`,
    '--ty': `${particle.ty}px`,
    '--rot': `${particle.rot}deg`,
    backgroundColor: particle.color,
    animation: getAnimationName(particle.type),
  };

  const className = `confetti-particle ${particle.type}`;

  return (
    <div
      className={className}
      style={{
        ...animationStyle,
        width: particle.type === 'circle' ? '10px' : particle.type === 'sparkle' ? '6px' : '8px',
        height: particle.type === 'circle' ? '10px' : particle.type === 'sparkle' ? '6px' : '24px',
        borderRadius: (particle.type === 'circle' || particle.type === 'sparkle') ? '50%' : '2px',
      }}
    />
  );
}

function getAnimationName(type) {
  switch (type) {
    case 'circle':
      return 'burstCircle 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    case 'star':
      return 'burstStar 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    case 'sparkle':
      return 'sparkleOut 2s ease-out forwards';
    default:
      return 'burstOut 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
  }
}
