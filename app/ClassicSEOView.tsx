'use client';

import { useEffect, useState, useMemo } from 'react';
import { useStore } from './useStore';
import QueryIntentPanel from '@/app/QueryIntentPanel';

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  border: string;
  current: number;
  previous: number;
  unit?: string;
  isReady: boolean;
  invertColor?: boolean;
}

function StatCard({ label, value, sub, border, current, previous, unit = "", isReady, invertColor = false }: StatCardProps) {
  const delta = current - previous;
  const improved = invertColor ? delta < 0 : delta > 0;
  const declined = invertColor ? delta > 0 : delta < 0;

  return (
    <div className={`bg-[#F8F5F1] rounded-2xl p-6 shadow-sm border-4 ${border} transform transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-35`}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 mb-1">{label}</p>
        <h3 className="text-5xl font-black text-[#2D334A] tracking-tighter leading-none">{value}</h3>
      </div>
      <div className="flex items-end justify-between mt-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 leading-none">
          {sub}
        </p>
        {isReady && (
          <div className="flex items-center gap-1">
            {improved && <ArrowUpIcon className="w-5 h-5 text-green-500 stroke-3" />}
            {declined && <ArrowDownIcon className="w-5 h-5 text-red-500 stroke-3" />}
            {!improved && !declined && <MinusIcon className="w-5 h-5 text-gray-300" />}
            
            <span className={`text-lg font-black leading-none ${improved ? "text-green-500" : declined ? "text-red-500" : "text-gray-400"}`}>
              {Math.abs(delta).toFixed(1)}{unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface GscDataPeriod {
  rows: any[];
  startDate: string;
  endDate: string;
}

export default function ClassicSEOView() {
  const [data, setData] = useState<{ current: GscDataPeriod, previous: GscDataPeriod }>({ current: { rows: [], startDate: '', endDate: '' }, previous: { rows: [], startDate: '', endDate: '' } });
  const [filter, setFilter] = useState<'all' | 'branded' | 'non-branded'>('all');
  const [error, setError] = useState<string | null>(null); // Add error state
  const [loading, setLoading] = useState(true);

  const processGscData = useStore(state => state.processGscData);
  const selectedStartDate = useStore(state => state.selectedStartDate);
  const selectedEndDate = useStore(state => state.selectedEndDate);
  const setFilteredRows = useStore(state => state.setFilteredRows);

  const filteredData = useMemo(() => {
    const brandTerms = [
      'baby bento', 
      'babybento', 
      'baby-bento', 
      'bb bento', 
      'bento baby',
      'baby bento box'
    ];

    return data.current.rows.filter((row: any) => {
      const query = row.keys[0].toLowerCase();
      const isBranded = brandTerms.some(term => query.includes(term));
      
      if (filter === 'branded') return isBranded;
      if (filter === 'non-branded') return !isBranded;
      return true; // 'all'
    });
  }, [data.current.rows, filter]);

  useEffect(() => {
    async function fetchGSC() {
      try {
        let url = '/api/gsc/performance';
        if (selectedStartDate && selectedEndDate) {
          url += `?start=${selectedStartDate}&end=${selectedEndDate}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        
        // 🛡️ CHECK: If the API returned an error object instead of an array
        if (json.error || !json.current.rows) {
          setError(json.error || "Failed to retrieve valid data format.");
          setData({ current: { rows: [], startDate: '', endDate: '' }, previous: { rows: [], startDate: '', endDate: '' } });
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
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (data.current.rows.length > 0) {
      processGscData(data.current, data.previous);
      
      // 🛡️ Technical Check: Defensive update to prevent render loops
      // We only update the store if the filtered count has actually changed
      if (useStore.getState().filteredRows.length !== filteredData.length) {
        setFilteredRows(filteredData);
      }
    }
  }, [data, filteredData, processGscData, setFilteredRows]);

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
  const totalClicks = data.current.rows.reduce((acc: number, row: any) => acc + (row.clicks || 0), 0);
  const totalImpressions = data.current.rows.reduce((acc: number, row: any) => acc + (row.impressions || 0), 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  // Calculate average position weighted by impressions
  const totalWeightedPosition = data.current.rows.reduce((acc: number, row: any) => acc + (row.position * row.impressions || 0), 0);
  const weightedAvgPosition = totalImpressions > 0 ? (totalWeightedPosition / totalImpressions) : 0;

  // Define Previous Aggregates (For Deltas)
  const prevTotalClicks = data.previous.rows.reduce((acc: number, row: any) => acc + (row.clicks || 0), 0);
  const prevTotalImpressions = data.previous.rows.reduce((acc: number, row: any) => acc + (row.impressions || 0), 0);
  const prevTotalWeightedPosition = data.previous.rows.reduce((acc: number, row: any) => acc + (row.position * row.impressions || 0), 0);
  const prevWeightedAvgPosition = prevTotalImpressions > 0 ? (prevTotalWeightedPosition / prevTotalImpressions) : 0;

  return (
    <div className="relative space-y-8 animate-fadeIn">
      {/* Unified GSC Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Live Clicks"
          value={totalClicks.toLocaleString()}
          sub="Current Period"
          border="border-[#FCD34D]"
          current={totalClicks}
          previous={prevTotalClicks}
          isReady={!loading}
        />
        <StatCard
          label="Total Impressions"
          value={totalImpressions.toLocaleString()}
          sub="Search Visibility"
          border="border-[#A7F3D0]"
          current={totalImpressions}
          previous={prevTotalImpressions}
          isReady={!loading}
        />
        <StatCard
          label="Avg. CTR"
          value={`${avgCtr.toFixed(1)}%`}
          sub="Click Efficiency"
          border="border-[#7DD3FC]"
          current={avgCtr}
          previous={prevTotalImpressions > 0 ? (prevTotalClicks / prevTotalImpressions) * 100 : 0}
          unit="%"
          isReady={!loading}
        />
        <StatCard
          label="Avg. Position"
          value={weightedAvgPosition.toFixed(1)}
          sub="Weighted Ranking"
          border="border-[#FCA5A5]"
          current={weightedAvgPosition}
          previous={prevWeightedAvgPosition}
          isReady={!loading}
          invertColor={true}
        />
      </div>

      <QueryIntentPanel 
        activeFilter={
          filter === 'all' ? 'All' : 
          filter === 'branded' ? 'Navigational' : 'Discovery'
        } 
      />

      <div className="flex flex-wrap gap-2 bg-slate-800 p-1.5 rounded-xl border border-white/5 w-full max-w-sm sm:w-fit mb-6">
        {['all', 'navigational', 'discovery'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type === 'navigational' ? 'branded' : type === 'discovery' ? 'non-branded' : 'all')}
            className={`flex-1 sm:flex-none px-4 py-2 text-[10px] tracking-widest uppercase font-black rounded-lg transition-all ${
              (filter === 'branded' && type === 'navigational') || (filter === 'non-branded' && type === 'discovery') || (filter === 'all' && type === 'all')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 📈 Live Performance Table */}
      <div className="bg-[#1e1b4b]/60 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
        <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center text-white">
          <h2 className="text-lg font-black italic uppercase tracking-tighter">Performance Velocity</h2>
          <span className="text-[9px] font-black bg-[#FF6F61] text-white px-3 py-1 rounded-full uppercase tracking-widest">Post-Retrieval Data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase font-black tracking-widest text-white/40 bg-black/20">
              <tr>
                <th className="px-10 py-6">Search Query</th>
                <th className="px-10 py-6 text-center">Clicks</th>
                <th className="px-10 py-6 text-center">Avg. Position</th>
                <th className="px-10 py-6 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="text-white divide-y divide-white/5">
              {filteredData.slice(0, 10).map((row: any, i: number) => {
                const prevRow = data.previous.rows.find((r: any) => r.keys[0] === row.keys[0]);
                const prevClicks = prevRow?.clicks || 0;
                const prevPos = prevRow?.position || row.position;
                const posDiff = prevPos - row.position;
                const improved = posDiff > 0;
                const clickDelta = row.clicks - prevClicks;
                const volatility = Math.abs(posDiff) > 5;
                
                return (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="px-10 py-8">
                      <div className="font-bold text-sm group-hover:text-blue-400 transition-colors">{row.keys[0]}</div>
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">Live Signal</div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex flex-col items-center leading-none">
                        <span className="text-xl font-black mb-1">{row.clicks.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          {clickDelta > 0 ? <ArrowUpIcon className="w-3 h-3 text-green-400" /> : clickDelta < 0 ? <ArrowDownIcon className="w-3 h-3 text-red-400" /> : <MinusIcon className="w-3 h-3 text-gray-500" />}
                          <span className={`text-[9px] font-black uppercase ${clickDelta > 0 ? "text-green-400" : "text-red-400"}`}>
                            {Math.abs(clickDelta)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex flex-col items-center leading-none">
                        <span className={`text-xl font-black mb-1 ${improved ? "text-emerald-400" : posDiff < 0 ? "text-red-500" : "text-white"}`}>
                          {row.position.toFixed(1)}
                        </span>
                        <div className="flex items-center gap-1">
                          {improved ? <ArrowUpIcon className="w-3 h-3 text-emerald-400" /> : posDiff < 0 ? <ArrowDownIcon className="w-3 h-3 text-red-500" /> : <MinusIcon className="w-3 h-3 text-gray-500" />}
                          <span className={`text-[9px] font-black uppercase ${improved ? "text-emerald-400" : "text-red-500"}`}>
                            {Math.abs(posDiff).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                         volatility ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                         improved ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                         "bg-white/5 text-white/50 border-white/10"
                       }`}>
                        {volatility ? "Volatile" : improved ? "Climbing" : "Stable"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}