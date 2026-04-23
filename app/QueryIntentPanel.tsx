"use client";

import React, { useMemo } from 'react';
import { useStore } from '@/app/useStore';

const STRATEGIC_MAP = {
  All: {
    comm: "Optimize 'Best' guides for Gemini retrieval.",
    info: "Identify PAA gaps in top-performing nodes.",
    tran: "Align GTINs for Google Shopping surfacing."
  },
  Navigational: {
    comm: "Protect brand space against 'vs' competitors.",
    info: "Update FAQ schema for branded long-tail queries.",
    tran: "Streamline sitelink structure for direct intent."
  },
  Discovery: {
    comm: "Aggressive 'Comparison Table' injection.",
    info: "Build 'How-to' VideoObjects for non-branded terms.",
    tran: "Verify Merchant Center feed health for broad terms."
  }
} as const;

interface QueryIntentPanelProps {
  activeFilter?: 'All' | 'Navigational' | 'Discovery';
}

export default function QueryIntentPanel({ activeFilter = 'All' }: QueryIntentPanelProps) {
  const { filteredRows } = useStore();

  const stats = useMemo(() => {
    if (!filteredRows || filteredRows.length === 0) return [];

    const intentCounts = { Informational: 0, Transactional: 0, Commercial: 0, Navigational: 0 };
    
    filteredRows.forEach(row => {
      const query = row.keys[0].toLowerCase();
      if (query.match(/best|top|vs|review|compare|comparison|rating/)) intentCounts.Commercial++;
      else if (query.match(/buy|order|shop|price|cheap|sale|discount|store|stockist/)) intentCounts.Transactional++;
      else if (query.match(/how|why|what|guide|tips|recipe|ideas|clean|wash|leak/)) intentCounts.Informational++;
      else intentCounts.Navigational++;
    });

    const total = filteredRows.length || 1;
    return {
      comm: Math.round((intentCounts.Commercial / total) * 100),
      info: Math.round((intentCounts.Informational / total) * 100),
      tran: Math.round((intentCounts.Transactional / total) * 100),
    };
  }, [filteredRows]);

  if (!stats || Array.isArray(stats)) return null;
  const currentPlay = STRATEGIC_MAP[activeFilter];

  const Card = ({ label, value, play }: { label: string; value: number; play: string }) => (
    <div className="bg-[#1e1b4b]/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">{label} Intent</p>
      <h3 className="text-5xl font-black text-white mb-6 tracking-tighter">{value.toString().padStart(2, '0')}%</h3>
      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <p className="text-[9px] font-black text-[#FF6F61] uppercase tracking-widest mb-1">Strategic Play</p>
        <p className="text-xs text-white/90 italic font-medium leading-relaxed">"{play}"</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="inline-block bg-[#FF6F61] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-orange-500/10">
        Query Intent Fan-Out
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Commercial" value={stats.comm} play={currentPlay.comm} />
        <Card label="Informational" value={stats.info} play={currentPlay.info} />
        <Card label="Transactional" value={stats.tran} play={currentPlay.tran} />
      </div>
    </div>
  );
}