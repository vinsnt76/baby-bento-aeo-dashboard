'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useStore } from '../useStore';

const INTENT_PATTERNS = {
  transactional: /\b(buy|order|shop|checkout|price|discount|sale|store)\b/i,
  commercial: /\b(best|review|vs|top|compare|comparison|cheapest|affordable)\b/i,
  informational: /\b(how|what|why|guide|tips|tutorial|meaning|definition|benefits)\b/i
};

export default function QueryIntentPanel() {
  const { 
    selectedStartDate, 
    selectedEndDate, 
    aiInsights, 
    isAiLoading, 
    generateInsights 
  } = useStore();

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch GSC Data on date change
  useEffect(() => {
    async function fetchGscData() {
      setLoading(true);
      try {
        const url = `/api/gsc/performance?start=${selectedStartDate}&end=${selectedEndDate}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.current?.rows) {
          setRows(json.current.rows);
        }
      } catch (error) {
        console.error('Failed to fetch intent data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGscData();
  }, [selectedStartDate, selectedEndDate]);

  // 2. Compute Intent Percentages
  const intentData = useMemo(() => {
    if (!rows.length) return { transactional: 0, commercial: 0, informational: 0 };

    let counts = { transactional: 0, commercial: 0, informational: 0 };
    rows.forEach(row => {
      const query = row.keys[0].toLowerCase();
      if (INTENT_PATTERNS.transactional.test(query)) counts.transactional++;
      else if (INTENT_PATTERNS.commercial.test(query)) counts.commercial++;
      else if (INTENT_PATTERNS.informational.test(query)) counts.informational++;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return {
      transactional: Math.round((counts.transactional / total) * 100),
      commercial: Math.round((counts.commercial / total) * 100),
      informational: Math.round((counts.informational / total) * 100)
    };
  }, [rows]);

  // 3. Trigger AI when intent profile shifts
  useEffect(() => {
    if (rows.length > 0) {
      generateInsights();
    }
  }, [intentData.transactional, intentData.commercial, intentData.informational, generateInsights]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-white/5 animate-pulse rounded-4xl border border-white/10" />
        ))}
      </div>
    );
  }

  const cards = [
    { 
      title: "Commercial", 
      weight: `${intentData.commercial}%`, 
      color: "#FCD34D",
      play: aiInsights?.lowHangingFruit || "Analyzing commercial opportunities..."
    },
    { 
      title: "Informational", 
      weight: `${intentData.informational}%`, 
      color: "#7DD3FC",
      play: aiInsights?.strategicHealth || "Evaluating information architecture..."
    },
    { 
      title: "Transactional", 
      weight: `${intentData.transactional}%`, 
      color: "#FCA5A5",
      play: aiInsights?.moonshot || "Optimizing conversion funnels..."
    }
  ];

  return (
    <section className="space-y-8 animate-fadeIn">
      <div className="inline-block rounded-md bg-[#FF6F61] text-white px-4 py-2 font-semibold uppercase tracking-widest text-sm shadow-lg">
        Query Intent Fan-Out
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cards.map((intent, i) => (
          <div key={i} className="bg-[#2D334A]/80 backdrop-blur-md p-8 rounded-4xl border border-white/10 shadow-inner group hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-white/50 mb-2">
                  {intent.title} Intent
                </p>
                <span className="text-6xl font-black italic text-white tracking-tighter" style={{ color: intent.color }}>
                  {intent.weight}
                </span>
              </div>
              {isAiLoading && (
                <span className="w-2 h-2 bg-[#FF6F61] rounded-full animate-ping" />
              )}
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-[#FF6F61] rounded-full" />
                <p className="text-[10px] font-black uppercase text-white/80 tracking-widest">AI Strategic Play</p>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
                {intent.play}
              </p>
            </div>
            
            {/* Progress Bar Background */}
            <div className="mt-6 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ 
                  width: intent.weight, 
                  backgroundColor: intent.color,
                  boxShadow: `0 0 10px ${intent.color}`
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}