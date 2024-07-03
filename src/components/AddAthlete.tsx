'use client';

import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

export default function AddAthlete() {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await addDoc(collection(db, 'athletes'), {
        name,
        gold: 0,
        silver: 0,
        bronze: 0,
      });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Athlete name"
        className="w-full p-2 text-black rounded"
      />
      <button type="submit" className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded">
        Add Athlete
      </button>
    </form>
  );
}