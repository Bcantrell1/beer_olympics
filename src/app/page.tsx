'use client';
import OlympicRings from '@/components/OlympicRings';
import { db } from '@/firebase/config';
import { DocumentData, QuerySnapshot, collection, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import AddAthlete from '../components/AddAthlete';
import AthleteList from '../components/AthleteList';
import Leaderboard from '../components/Leaderboard';
import MetalCeremony from '../components/MetalCeremony';

interface Athlete {
  id: string;
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

export default function Home() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'athletes'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        setAthletes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Athlete, 'id'>),
          }))
        );
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen text-white relative bg-gray-900 bg-opacity-90" style={{
      backgroundImage: `
        radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, rgba(0, 129, 200, 0.15) 2%, transparent 0%),
        radial-gradient(circle at 125px 125px, rgba(238, 51, 78, 0.15) 2%, transparent 0%),
        radial-gradient(circle at 175px 175px, rgba(252, 177, 49, 0.15) 2%, transparent 0%),
        radial-gradient(circle at 225px 225px, rgba(0, 166, 81, 0.15) 2%, transparent 0%)
      `,
      backgroundSize: '250px 250px'
    }}>
      <div className="container mx-auto px-4 pb-20 py-8 relative z-10">
        <motion.h1 
          className="font-bold mb-8 text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-5xl text-yellow-400 transform -rotate-3 inline-block">
            Elephant
          </span>
          <span className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-red-500 transform rotate-3 inline-block mt-2">
            BUTT
          </span>
          <span className="block text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-400 mt-2">
            <FaBeer className="inline-block mr-2 animate-bounce" />
            Beer Olympics
            <FaBeer className="inline-block ml-2 animate-bounce" />
          </span>
        </motion.h1>
        <OlympicRings />
        <MetalCeremony athletes={athletes} />
        <Leaderboard athletes={athletes} />
        <AthleteList athletes={athletes} />
        <AddAthlete />
      </div>
    </main>
  );
}