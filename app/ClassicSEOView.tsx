'use client';

import { useEffect, useState } from 'react';

export default function ClassicSEOView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGSC() {
      try {
        const res = await fetch('/api/gsc/performance');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch live data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGSC();
  }, []);

  if (loading) return <div className="animate-pulse text-zinc-500">Retrieving Live Signals...</div>;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* We will build "Live Stats" cards here next */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Live Clicks (30d)</p>
          <h3 className="text-3xl font-bold text-white">{data.reduce((acc, row) => acc + row.clicks, 0)}</h3>
        </div>
      </div>

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
            {data.slice(0, 10).map((row, i) => (
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