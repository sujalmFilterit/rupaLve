'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, recipientName = 'Payal' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-md w-full card-shadow"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.7, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="text-4xl mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💕
            </motion.div>

            <h2 className="text-3xl font-bold text-gradient mb-4">
              I knew it! ❤️
            </h2>

            <div className="space-y-4 text-gray-700 mb-6">
              <p>
                You make my world brighter, my heart happier, and my life more beautiful.
              </p>
              <p>
                To fir hum kal kaha jaa rahe hain date pe..??
              </p>
              <p className="text-sm italic">
                I know you might not love me the same way, but I'm happy with your friendship. Maybe the wait is longer, but if the destination is you, I don't mind the time or distance. 💖🌼
              </p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full gradient-rose text-white py-3 rounded-full font-bold"
            >
              Aww, close ❤️
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
