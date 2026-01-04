'use client';

import { useEffect, useState } from 'react';
import DeltaRadar from './DeltaRadar';

export default function ClassicSEOView() {
  const [data, setData] = useState<{ current: any[], previous: any[] }>({ current: [], previous: [] });
  const [error, setError] = useState<string | null>(null); // Add error state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGSC() {
      try {
        const res = await fetch('/api/gsc/performance');
        const json = await res.json();
        
        // 🛡️ CHECK: If the API returned an error object instead of an array
        if (json.error || !json.current) {
          setError(json.error || "Failed to retrieve valid data format.");
          setData({ current: [], previous: [] });
        } else {
          setData(json);
          setError(null);
        }
      } catch (err) {
        setError("Network error: Could not connect to API.");
      } finally {
        setLoading(false);
      }
    }
    fetchGSC();
  }, []);

  if (loading) return <div className="p-8 text-zinc-500 animate-pulse">Retrieving Live Signals...</div>;
  
  // 🚨 Display the actual error so we can fix it!
  if (error) return (
    <div className="p-6 border border-red-500/50 bg-red-500/10 rounded-2xl text-red-400">
      <h4 className="font-bold mb-2">API Connection Error</h4>
      <p className="text-sm font-mono bg-black/30 p-2 rounded">{error}</p>
      <p className="mt-4 text-xs text-zinc-400 uppercase tracking-widest">Action: Check your .env.local keys</p>
    </div>
  );

  // 📊 Calculate Aggregates
  const totalClicks = data.current.reduce((acc: number, row: any) => acc + (row.clicks || 0), 0);
  const totalImpressions = data.current.reduce((acc: number, row: any) => acc + (row.impressions || 0), 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Live Clicks (30d)</p>
          <h3 className="text-3xl font-bold text-white">
            {totalClicks.toLocaleString()}
          </h3>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Total Impressions</p>
          <h3 className="text-3xl font-bold text-white">
            {totalImpressions.toLocaleString()}
          </h3>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Avg. CTR</p>
          <h3 className="text-3xl font-bold text-[#FF6F61]">
            {avgCtr.toFixed(1)}%
          </h3>
        </div>
      </div>

      <DeltaRadar currentData={data.current} previousData={data.previous} />

      {/* 📈 Live Performance Table */}
      <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase text-zinc-500">Top Queries</th>
              <th className="p-4 text-xs font-semibold uppercase text-zinc-500">Clicks</th>
              <th className="p-4 text-xs font-semibold uppercase text-zinc-500">Position</th>
            </tr>
          </thead>
          <tbody>
            {data.current.slice(0, 10).map((row: any, i: number) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/2 transition-colors">
                <td className="p-4 font-medium text-white">{row.keys[0]}</td>
                <td className="p-4 text-zinc-400">{row.clicks}</td>
                <td className="p-4 text-[#FF6F61] font-mono">{row.position.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}