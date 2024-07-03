'use client';

import { db } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AddAthlete from '../components/AddAthlete';
import AthleteList from '../components/AthleteList';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'athletes'), (snapshot) => {
      setAthletes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-olympic-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Beer Olympics</h1>
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-olympic-blue"></div>
          <div className="w-8 h-8 rounded-full bg-olympic-yellow"></div>
          <div className="w-8 h-8 rounded-full bg-olympic-black"></div>
          <div className="w-8 h-8 rounded-full bg-olympic-green"></div>
          <div className="w-8 h-8 rounded-full bg-olympic-red"></div>
        </div>
        <Leaderboard athletes={athletes} />
        <AthleteList athletes={athletes} />
        <AddAthlete />
      </div>
    </main>
  );
}