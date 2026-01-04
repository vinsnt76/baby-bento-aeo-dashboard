'use client';

import { useEffect, useState, useMemo } from 'react';
import { VELOCITY_DEC_25 } from './velocity-dec-25';

export default function DeltaRadar() {
  const [liveData, setLiveData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSync() {
      try {
        const res = await fetch('/api/gsc/performance');
        const json = await res.json();
        setLiveData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Delta Sync Failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAndSync();
  }, []);

  const mergedData = useMemo(() => {
    return VELOCITY_DEC_25.map((node) => {
      // 1. Tokenize the baseline query (remove small stop words)
      const baselineTokens = node.topQuery
        .toLowerCase()
        .split(' ')
        .filter(token => token.length > 2);

      let bestMatch: any = null;
      let highestConfidence = 0;

      // 2. Iterate through GSC data to find the best semantic fit
      liveData.forEach(row => {
        if (!row.keys || !row.keys[0]) return;
        const gscQuery = row.keys[0].toLowerCase();
        
        // Calculate how many baseline tokens appear in this GSC query
        const matchingTokens = baselineTokens.filter(token => gscQuery.includes(token));
        const confidence = matchingTokens.length / baselineTokens.length;

        // 3. Threshold: If > 50% of keywords match, we consider it a hit
        if (confidence > highestConfidence && confidence >= 0.5) {
          highestConfidence = confidence;
          bestMatch = row;
        }
      });

      const livePos = bestMatch ? Number(bestMatch.position.toFixed(1)) : null;
      
      // Opportunity Score: Higher is better (High Potential / Low Current Rank)
      // If position is 1, score is basically the lift. If position is 50, score is low.
      const score = (livePos && livePos > 0) 
        ? Number((node.retrievalLift / (livePos / 10)).toFixed(1)) 
        : 0;

      return { 
        ...node, 
        livePos, 
        score, 
        confidence: Math.round(highestConfidence * 100) 
      };
    });
  }, [liveData]);

  if (loading) return <div className="p-8 text-zinc-500 italic">Syncing Delta Engine...</div>;

  return (
    <div className="mt-12 p-6 bg-zinc-900 rounded-xl shadow-sm border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Delta Engine: Retrieval Gaps</h3>
        <span className="text-xs text-zinc-400">Live GSC Sync: {liveData.length > 0 ? '🟢 Active' : '🔴 No Data'}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-zinc-500 text-xs uppercase tracking-wider">
              <th className="pb-3">Optimization Node</th>
              <th className="pb-3">AEO Lift</th>
              <th className="pb-3 text-center">Live Rank</th>
              <th className="pb-3 text-right">Opportunity Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mergedData.map((item) => (
              <tr key={item.node} className="hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="font-medium text-zinc-300">{item.node}</div>
                  <div className="text-xs text-zinc-500 italic">{item.topQuery}</div>
                </td>
                <td className="py-4 text-[#FF6F61] font-bold">{item.retrievalLift}%</td>
                <td className="py-4 text-center text-zinc-400 font-mono">
                  {item.livePos ? (
                    item.livePos
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-zinc-600 italic">No Match</span>
                      {item.confidence > 0 && (
                        <span className="text-[10px] text-zinc-500">({item.confidence}% match)</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="py-4 text-right">
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-black ${
                    item.score > 8 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.score > 4 ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-zinc-800 text-zinc-500'
                    }`}>
                      {item.score > 0 ? item.score : '--'}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}