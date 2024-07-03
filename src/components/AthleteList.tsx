'use client';

import { db } from '@/firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaMedal, FaTrash } from 'react-icons/fa';

interface Athlete {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface AthleteListProps {
  athletes: Athlete[];
}

export default function AthleteList({ athletes }: AthleteListProps) {
  const updateMedal = async (id: string, medal: 'gold' | 'silver' | 'bronze', increment: number) => {
    const athleteRef = doc(db, 'athletes', id);
    const athlete = athletes.find((a) => a.id === id);
   
    if (athlete) {
      const newCount = Math.max((athlete[medal] || 0) + increment, 0);
      await updateDoc(athleteRef, {
        [medal]: newCount,
      });
    } else {
      console.error(`Athlete with id ${id} not found`);
    }
  };

  const deleteAthlete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this athlete?')) {
      await deleteDoc(doc(db, 'athletes', id));
    }
  };

  const MedalDisplay = ({ athlete, medal }: { athlete: Athlete, medal: 'gold' | 'silver' | 'bronze' }) => {
    const colors = {
      gold: 'text-yellow-400',
      silver: 'text-gray-400',
      bronze: 'text-yellow-700'
    };

    return (
      <div className={`flex items-center ${colors[medal]}`}>
        <FaMedal className="mr-1" />
        <span>{athlete[medal]}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {athletes.map((athlete: Athlete) => (
        <motion.div 
          key={athlete.id} 
          className="bg-white text-black p-4 rounded shadow relative"
        >
          <button
            onClick={() => deleteAthlete(athlete.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
          <h2 className="text-xl font-bold mb-3 truncate pr-6">{athlete.name}</h2>
          <div className="flex justify-between items-center">
            <MedalDisplay athlete={athlete} medal="gold" />
            <MedalDisplay athlete={athlete} medal="silver" />
            <MedalDisplay athlete={athlete} medal="bronze" />
          </div>
          <div className="mt-4 flex justify-between">
            {['gold', 'silver', 'bronze'].map((medal) => (
              <div key={medal} className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateMedal(athlete.id, medal as 'gold' | 'silver' | 'bronze', 1)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mb-1"
                >
                  +
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateMedal(athlete.id, medal as 'gold' | 'silver' | 'bronze', -1)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  -
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}