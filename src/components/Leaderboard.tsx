'use client';

import { useMemo } from 'react';

export default function Leaderboard({ athletes }) {
  const sortedAthletes = useMemo(() => {
    return [...athletes].sort((a, b) => {
      const aPoints = (a.gold * 3) + (a.silver * 2) + a.bronze;
      const bPoints = (b.gold * 3) + (b.silver * 2) + b.bronze;
      return bPoints - aPoints;
    });
  }, [athletes]);

  return (
    <div className="mt-8 p-4 bg-olympic-blue text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Name</th>
            <th className="text-right">Gold</th>
            <th className="text-right">Silver</th>
            <th className="text-right">Bronze</th>
            <th className="text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedAthletes.map((athlete, index) => (
            <tr key={athlete.id} className={index % 2 === 0 ? 'bg-opacity-20 bg-white' : ''}>
              <td>{index + 1}</td>
              <td>{athlete.name}</td>
              <td className="text-right">{athlete.gold}</td>
              <td className="text-right">{athlete.silver}</td>
              <td className="text-right">{athlete.bronze}</td>
              <td className="text-right">{(athlete.gold * 3) + (athlete.silver * 2) + athlete.bronze}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}