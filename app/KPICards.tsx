'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from './useStore'; // Ensure case-sensitivity matches the file [cite: 8, 14]

export default function KPICards() {
  const { brandedClicks, nonBrandedClicks, ownershipScore } = useStore();
  const [mounted, setMounted] = useState(false);

  // Hydration guard to ensure UI stability [cite: 5, 35, 40]
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-35" />; // Prevents layout shift [cite: 9]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 1. Ownership Score Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-400 transition-all hover:scale-105 cursor-pointer group relative">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Ownership Score</p>
          <div className="relative">
            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 cursor-help hover:border-gray-400 hover:text-gray-600">?</div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 p-3 bg-slate-800 text-white text-[10px] leading-relaxed rounded-lg shadow-xl z-50 pointer-events-none">
              <span className="font-bold block mb-1 text-yellow-400">AEO Viability Metric</span>
              Formula: (Non-Branded Share) × (Semantic Density). [cite: 5] High scores indicate topical authority.
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
            </div>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-[#121212]">
          {ownershipScore.toFixed(1)}%
        </h3>
      </div>

      {/* 2. Branded Clicks Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-emerald-400 transition-all hover:scale-105 cursor-pointer">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Branded Clicks</p>
        <h3 className="text-3xl font-bold text-[#121212]">
          {brandedClicks.toLocaleString()}
        </h3>
      </div>

      {/* 3. Discovery (Non-Branded) Clicks Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500 transition-all hover:scale-105 cursor-pointer">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Discovery Clicks</p>
        <h3 className="text-3xl font-bold text-[#121212]">
          {nonBrandedClicks.toLocaleString()}
        </h3>
      </div>
    </div>
  );
}