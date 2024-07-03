'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { FaFlag, FaMedal } from 'react-icons/fa';

interface Athlete {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface MedalCeremonyProps {
  athletes: Athlete[];
}

const MedalCeremony: React.FC<MedalCeremonyProps> = ({ athletes }) => {
  const [showCeremony, setShowCeremony] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const sortedAthletes = [...athletes].sort((a, b) =>
    (b.gold * 3 + b.silver * 2 + b.bronze) - (a.gold * 3 + a.silver * 2 + a.bronze)
  ).slice(0, 3);

  const podiumColors = ['bg-yellow-400', 'bg-gray-300', 'bg-yellow-700'];
  const medalColors = ['text-yellow-400', 'text-gray-300', 'text-yellow-700'];

  const startCeremony = () => {
    setShowCeremony(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 10000);
  };

  return (
    <>
      <button
        onClick={startCeremony}
        className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        title="Secret Medal Ceremony"
      >
        🏅
      </button>

      <AnimatePresence>
        {showCeremony && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setShowCeremony(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-blue-900 to-blue-700 p-8 rounded-lg shadow-2xl max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} />}
              <h2 className="text-4xl font-bold mb-8 text-center text-white">Medal Ceremony</h2>
              <div className="flex justify-center items-end h-96 relative">
                {sortedAthletes.map((athlete, index) => (
                  <motion.div
                    key={athlete.id}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={`${podiumColors[index]} rounded-t-lg flex flex-col items-center justify-end mx-2 relative`}
                    style={{ width: '30%', height: `${70 + (2-index) * 15}%` }}
                  >
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="absolute -top-16"
                    >
                      <FaMedal className={`text-6xl ${medalColors[index]}`} />
                    </motion.div>
                    <div className="text-xl font-bold text-center mb-2 text-black">{athlete.name}</div>
                    <div className="text-3xl font-bold mb-4 text-black">{index + 1}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MedalCeremony;