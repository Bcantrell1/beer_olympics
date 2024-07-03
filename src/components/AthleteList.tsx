'use client';

import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface Athlete {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

export default function AthleteList({ athletes }) {
  const updateMedal = async (id: string, medal: 'gold' | 'silver' | 'bronze') => {
    const athleteRef = doc(db, 'athletes', id);
    const athlete = athletes.find((a) => a.id === id);
    
    if (athlete) {
      await updateDoc(athleteRef, {
        [medal]: (athlete[medal] || 0) + 1,
      });
    } else {
      console.error(`Athlete with id ${id} not found`);
    }
  };

  return (
    <div className="space-y-4">
      {athletes.map((athlete: Athlete) => (
        <div key={athlete.id} className="bg-white text-black p-4 rounded shadow">
          <h2 className="text-xl font-bold">{athlete.name}</h2>
          <div className="flex space-x-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => updateMedal(athlete.id, 'gold')}
              className="bg-yellow-400 px-2 py-1 rounded"
            >
              Gold: {athlete.gold}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => updateMedal(athlete.id, 'silver')}
              className="bg-gray-300 px-2 py-1 rounded"
            >
              Silver: {athlete.silver}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => updateMedal(athlete.id, 'bronze')}
              className="bg-yellow-600 px-2 py-1 rounded"
            >
              Bronze: {athlete.bronze}
            </motion.button>
          </div>
        </div>
      ))}
    </div>
  );
}