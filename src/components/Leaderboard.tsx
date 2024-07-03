'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { FaMedal } from 'react-icons/fa';

interface Athlete {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface LeaderboardProps {
  athletes: Athlete[];
}

export default function Leaderboard({ athletes }: LeaderboardProps) {
  const sortedAthletes = useMemo(() => {
    return [...athletes].sort((a, b) => {
      const aPoints = (a.gold * 3) + (a.silver * 2) + a.bronze;
      const bPoints = (b.gold * 3) + (b.silver * 2) + b.bronze;
      return bPoints - aPoints;
    });
  }, [athletes]);

  const getPointsColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-yellow-700';
    return 'text-white';
  };

  return (
    <div className="mt-8 mb-10 p-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>
      
      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {sortedAthletes.map((athlete, index) => (
          <motion.div
            key={athlete.id}
            className="bg-white text-black p-4 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${getPointsColor(index)}`}>{index + 1}</span>
              <span className="text-xl font-semibold">{athlete.name}</span>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <FaMedal className="text-yellow-400 mr-1" /> {athlete.gold}
              </div>
              <div className="flex items-center">
                <FaMedal className="text-gray-400 mr-1" /> {athlete.silver}
              </div>
              <div className="flex items-center">
                <FaMedal className="text-yellow-700 mr-1" /> {athlete.bronze}
              </div>
              <div className="font-bold">
                {(athlete.gold * 3) + (athlete.silver * 2) + athlete.bronze} pts
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-white">
              <th className="text-left pb-2">Rank</th>
              <th className="text-left pb-2">Name</th>
              <th className="text-right pb-2">Gold</th>
              <th className="text-right pb-2">Silver</th>
              <th className="text-right pb-2">Bronze</th>
              <th className="text-right pb-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedAthletes.map((athlete, index) => (
              <motion.tr
                key={athlete.id}
                className={index % 2 === 0 ? 'bg-blue-800 bg-opacity-50' : ''}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className={`py-2 ${getPointsColor(index)} font-bold`}>{index + 1}</td>
                <td className="py-2">{athlete.name}</td>
                <td className="text-right py-2">{athlete.gold}</td>
                <td className="text-right py-2">{athlete.silver}</td>
                <td className="text-right py-2">{athlete.bronze}</td>
                <td className="text-right py-2 font-bold">
                  {(athlete.gold * 3) + (athlete.silver * 2) + athlete.bronze}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}