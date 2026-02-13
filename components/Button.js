'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function MoveableNoButton({ onYes, onNo }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);
  const [lastPosition, setLastPosition] = useState(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    const padding = 10;

    const minX = button.width / 2 + padding;
    const maxX = container.width - button.width / 2 - padding;
    const minY = button.height / 2 + padding;
    const maxY = container.height - button.height / 2 - padding;

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    if (rangeX <= 0 || rangeY <= 0) return;

    let newX, newY;
    const minDistance = Math.min(container.width, container.height) * 0.4;
    let attempts = 0;

    do {
      newX = minX + Math.random() * rangeX;
      newY = minY + Math.random() * rangeY;
      attempts++;

      if (!lastPosition) break;

      const dx = newX - lastPosition.x;
      const dy = newY - lastPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > minDistance || attempts > 10) break;
    } while (attempts < 20);

    const newRotation = (Math.random() - 0.5) * 15;

    setNoPosition({ x: newX, y: newY });
    setRotation(newRotation);
    setLastPosition({ x: newX, y: newY });
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div
        className="w-full max-w-xs h-40 relative"
        ref={containerRef}
      >
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-0 -translate-y-1/2 gradient-rose text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Yes 💖
        </motion.button>

        <motion.button
          ref={noButtonRef}
          onClick={moveNoButton}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          animate={{
            x: noPosition.x,
            y: noPosition.y,
            rotate: rotation,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 1,
          }}
          className="absolute gradient-rose-light text-rose-800 px-8 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-shadow"
          style={{
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
        >
          No 😢
        </motion.button>
      </div>
    </div>
  );
}
