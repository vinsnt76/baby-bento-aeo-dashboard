'use client';

import React from 'react';
import { useStore } from './useStore';

export default function KPICards() {
  const { brandedClicks, nonBrandedClicks, ownershipScore } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-red-400 transition-all hover:scale-105 hover:bg-red-500/20 cursor-pointer">
        <p className="text-red-300 text-xs uppercase tracking-widest mb-2">Ownership Score</p>
        <h3 className="text-3xl font-bold text-white">
          {ownershipScore.toFixed(1)}%
        </h3>
      </div>
      <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-red-400 transition-all hover:scale-105 hover:bg-red-500/20 cursor-pointer">
        <p className="text-red-300 text-xs uppercase tracking-widest mb-2">Branded Clicks</p>
        <h3 className="text-3xl font-bold text-white">
          {brandedClicks.toLocaleString()}
        </h3>
      </div>
      <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-red-400 transition-all hover:scale-105 hover:bg-red-500/20 cursor-pointer">
        <p className="text-red-300 text-xs uppercase tracking-widest mb-2">Discovery Clicks</p>
        <h3 className="text-3xl font-bold text-[#60a5fa]">
          {nonBrandedClicks.toLocaleString()}
        </h3>
      </div>
    </div>
  );
}