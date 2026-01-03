'use client';

import { useEffect, useState } from 'react';
import { calculateDelta, DeltaResult } from './delta';

export default function DeltaRadar() {
  const [deltas, setDeltas] = useState<DeltaResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSync() {
      try {
        const res = await fetch('/api/gsc/performance');
        const liveData = await res.json();
        const results = calculateDelta(liveData);
        setDeltas(results.sort((a, b) => b.gapScore - a.gapScore));
      } catch (err) {
        console.error("Delta Sync Failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAndSync();
  }, []);

  if (loading) return <div className="p-8 text-zinc-500 italic">Syncing Delta Engine...</div>;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-[#FF6F61] rounded-full animate-pulse"></span>
        <h3 className="text-sm font-bold tracking-widest uppercase text-white">Retrieval Gap Analysis</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {deltas.filter(d => d.gapScore > 0).map((delta, i) => (
          <div key={i} className="bg-zinc-900 border-l-4 border-[#FF6F61] p-5 rounded-r-2xl flex justify-between items-center group hover:bg-zinc-800/50 transition-all">
            <div>
              <p className="text-xs text-[#FF6F61] font-bold mb-1 uppercase tracking-tighter">Priority Gap</p>
              <h4 className="text-lg font-bold text-white mb-1">{delta.node}</h4>
              <p className="text-sm text-zinc-400">{delta.recommendation}</p>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-zinc-500 mb-1 uppercase">Live Position</div>
              <div className="text-2xl font-mono font-bold text-white">#{delta.livePosition}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}