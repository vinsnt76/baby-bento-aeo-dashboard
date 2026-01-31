'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import ChartContainer from './ChartContainer';
import { useStore } from './useStore';
import CategoryOwnership from './CategoryOwnership';
import KPICards from './KPICards';

interface DeltaRadarProps {
  currentData: any[];
  previousData: any[];
}

export default function DeltaRadar({ currentData, previousData }: DeltaRadarProps) {
  const { mergedData, selectedNode, setSelectedNode } = useStore();
  const [isReady, setIsReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Delay by 100ms to allow Tailwind grid to finish 'painting'
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  
  const insights = useMemo(() => {
    if (!mergedData || !mergedData.length) return {};
    
    // Sort nodes to find specific performance archetypes
    const sortedByOwnership = [...mergedData].sort((a, b) => b.nonBranded - a.nonBranded); // Using nonBranded count/share proxy
    const sortedByMomentum = [...mergedData].sort((a, b) => (b.rawMomentum || 0) - (a.rawMomentum || 0));
    const weakestNode = [...mergedData].sort((a, b) => a.formationScore - b.formationScore)[0];

    const topOwner = sortedByOwnership[0];
    const topClimber = sortedByMomentum[0];

    if (!topOwner || !topClimber || !weakestNode) return {};

    return {
      ownership: {
        title: "Ownership Signal",
        nodeName: topOwner.name,
        text: `${topOwner.name} leads in non-branded discovery. This entity is successfully decoupling from brand-only searches.`,
        color: "blue"
      },
      momentum: {
        title: "Momentum Alert",
        nodeName: topClimber.name,
        text: `${topClimber.name} shows the strongest velocity (Score: ${topClimber.formationScore.toFixed(0)}). Expect increased AI-overviews for this node shortly.`,
        color: "pink"
      },
      action: {
        title: "Next Best Action",
        nodeName: weakestNode.name,
        text: `Priority: ${weakestNode.name}. Low semantic density detected. Deploy FAQ schema or supporting articles to reinforce this entity's 'Establishing' phase.`,
        color: "slate"
      }
    };
  }, [mergedData]);

  const activateBrief = (nodeName: string) => {
    const queryList = currentData
      .filter(r => nodeName.toLowerCase().split(' ').some((t: string) => r.keys[0].toLowerCase().includes(t)))
      .map(r => r.keys[0])
      .join('\n');
      
    navigator.clipboard.writeText(`Content Brief for ${nodeName}:\n\nTarget Queries:\n${queryList}`);
    alert(`Strategic foundation for ${nodeName} copied to clipboard!`);
  };

  // Safety check for data and hydration
  if (!isReady || !currentData) {
    return <div className="h-100 w-full animate-pulse bg-slate-800/20 rounded-2xl" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-red-500/10 rounded-2xl border border-red-500/50 min-h-[350px] min-w-0">
      
      {/* 📊 ENTITY FORMATION RADAR */}
      <div className={`${isZoomed ? 'fixed inset-0 z-50 bg-slate-950 p-4' : 'relative'} min-w-0`}>
        {/* Zoom Toggle Button */}
        <button 
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-2 right-2 z-10 p-2 bg-white/5 rounded-lg sm:hidden text-white text-xs"
        >
          {isZoomed ? '✕ Close' : '🔍 Zoom'}
        </button>
        
        <ChartContainer title="Entity Formation Radar" subtitle="Semantic Density vs. Velocity">
          <ResponsiveContainer width="100%" height="100%" debounce={100}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mergedData}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={(props: any) => {
                  const { x, y, payload } = props;
                  
                  // Safety check: if Recharts hasn't calculated x/y yet, return null
                  if (x === undefined || y === undefined) return <g />;

                  return (
                    <g 
                      transform={`translate(${x},${y})`} 
                      onClick={() => setSelectedNode(payload.value)}
                      style={{ cursor: 'pointer' }}
                    >
                      <text
                        x={0}
                        y={y > 150 ? 15 : -15} // Adjust vertical offset based on position
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize={isMobile ? 8 : 10}
                        fontWeight="600"
                        className="uppercase tracking-tighter"
                      >
                        {isMobile && payload.value.length > 12 
                          ? `${payload.value.substring(0, 10)}...` 
                          : payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <Radar
                name="Formation"
                dataKey="Overlap"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="Momentum"
                dataKey="Momentum"
                stroke="#f472b6"
                fill="#f472b6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* 🧠 FORMATION LEADERBOARD FIX */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-white/5 flex flex-col h-full min-w-0">
        <h3 className="text-white text-xs font-bold mb-4 uppercase tracking-widest opacity-70">Formation Leaderboard</h3>
        <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {mergedData.map(item => (
            <div 
              key={item.name} 
              onClick={() => setSelectedNode(item.name)}
              className={`flex items-center justify-between p-2.5 rounded-lg border border-white/5 transition-colors cursor-pointer ${
                selectedNode === item.name ? 'bg-blue-900/40 border-blue-500/50' : 'bg-slate-900/40 hover:bg-slate-900/80'
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate leading-none">{item.name}</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter mt-1">Growth Node</p>
              </div>
              
              <div className="flex items-center gap-3 ml-4">
                <div className="text-right whitespace-nowrap">
                  <div className={`text-xs font-black tabular-nums flex items-center justify-end gap-1 ${
                    item.trend === '▲' ? 'text-blue-400' : item.trend === '▼' ? 'text-pink-400' : 'text-slate-500'
                  }`}>
                    <span className="text-[10px]">{item.trend}</span>
                    {item.formationScore.toFixed(0)}
                  </div>
                  <p className="text-[8px] text-slate-600 uppercase font-bold text-right">Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📈 CATEGORY OWNERSHIP BAR */}
      <div className="lg:col-span-2 min-w-0">
        <KPICards />
        <CategoryOwnership />
      </div>

      {/* 💡 STRATEGIC INSIGHTS */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(insights).map((insight: any) => (
          <div key={insight.title} className={`bg-slate-800/50 p-6 rounded-xl border-l-4 ${
            insight.color === 'blue' ? 'border-blue-400' : 
            insight.color === 'pink' ? 'border-pink-400' : 'border-slate-400'
          } border-y border-r border-white/5`}>
            <h4 className={`text-sm font-bold mb-2 ${
              insight.color === 'blue' ? 'text-blue-400' : 
              insight.color === 'pink' ? 'text-pink-400' : 'text-slate-400'
            }`}>
              {insight.title}
            </h4>
            <p className="text-slate-300 text-[13px] leading-relaxed">
              {insight.text}
            </p>
            {insight.title === "Next Best Action" && (
              <button 
                onClick={() => activateBrief(insight.nodeName)}
                className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white transition-all active:scale-95"
              >
                Activate Foundation
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}