'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import ChartContainer from './ChartContainer';
import { VELOCITY_DEC_25 } from './velocity-dec-25';

interface DeltaRadarProps {
  currentData: any[];
  previousData: any[];
}

export default function DeltaRadar({ currentData, previousData }: DeltaRadarProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  
  const mergedData = useMemo(() => {
    return VELOCITY_DEC_25.map(node => {
      // 1. Tokenize & Fuzzy Match Logic
      const tokens = node.node.toLowerCase().split(' ');
      
      // BRANDED FILTER LOGIC
      const brandTerms = [
        'baby bento', 
        'babybento', 
        'baby-bento', 
        'bb bento', 
        'bento baby',
        'baby bento box'
      ];
      
      // Filter all queries matching this node's tokens
      const nodeQueries = currentData?.filter(r => 
        tokens.some((t: string) => r.keys[0].toLowerCase().includes(t))
      ) || [];

      const branded = nodeQueries.filter(r => 
        brandTerms.some(bt => r.keys[0].toLowerCase().includes(bt))
      );
      
      const nonBranded = nodeQueries.filter(r => 
        !brandTerms.some(bt => r.keys[0].toLowerCase().includes(bt))
      );

      const brandedClicks = branded.reduce((acc, curr) => acc + curr.clicks, 0);
      const nonBrandedClicks = nonBranded.reduce((acc, curr) => acc + curr.clicks, 0);
      const totalClicks = brandedClicks + nonBrandedClicks || 1;

      // OWNERSHIP CALCULATION
      const nonBrandedPercent = (nonBrandedClicks / totalClicks) * 100;
      const semanticDensity = Math.min(100, nodeQueries.length * 15);
      const ownershipScore = (nonBrandedPercent * (semanticDensity / 100)).toFixed(0);

      // Find best single match for position tracking
      const currentMatch = nodeQueries.sort((a, b) => b.clicks - a.clicks)[0];
      const previousMatch = previousData?.find(row => {
        const query = row.keys[0].toLowerCase();
        const matches = tokens.filter((t: string) => query.includes(t)).length;
        return matches / tokens.length >= 0.5;
      });

      // Metric Normalization
      const currentPos = currentMatch ? parseFloat(currentMatch.position) : 100;
      const prevPos = previousMatch ? parseFloat(previousMatch.position) : 100;
      
      // Momentum calculation
      const momentum = prevPos - currentPos; // Positive means rank improved (decreased)
      
      // 4. Formation Score (0-100)
      const formationScore = Math.min(100, Math.max(0, 
        (node.retrievalLift * 0.4) + ((100 - currentPos) * 0.6)
      ));

      return {
        name: node.node,
        "Overlap": nodeQueries.length > 0 ? 80 : 20,
        "Momentum": 50 + (momentum * 5), // Centered at 50
        "Diversity": semanticDensity,
        "AEO Lift": node.retrievalLift,
        "Stability": previousMatch ? 90 : 30,
        formationScore,
        trend: momentum > 0 ? '▲' : momentum < 0 ? '▼' : '→',
        branded: brandedClicks,
        nonBranded: nonBrandedClicks,
        ownershipScore,
        rawMomentum: momentum,
      };
    });
  }, [currentData, previousData]);

  const insights = useMemo(() => {
    if (!mergedData.length) return {};
    
    // Sort nodes to find specific performance archetypes
    const sortedByOwnership = [...mergedData].sort((a, b) => b.nonBranded - a.nonBranded); // Using nonBranded count/share proxy
    const sortedByMomentum = [...mergedData].sort((a, b) => (b.rawMomentum || 0) - (a.rawMomentum || 0));
    const weakestNode = [...mergedData].sort((a, b) => a.formationScore - b.formationScore)[0];

    const topOwner = sortedByOwnership[0];
    const topClimber = sortedByMomentum[0];

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
        text: `${topClimber.name} shows the strongest velocity (Score: ${topClimber.formationScore}). Expect increased AI-overviews for this node shortly.`,
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
  if (!mounted || !currentData || !previousData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-slate-900/40 rounded-2xl border border-white/5">
        <div className="text-slate-500 text-xs animate-pulse uppercase tracking-widest">
          Stabilizing Intelligence Layer...
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-slate-900 rounded-xl border border-white/5">
      
      {/* 📊 ENTITY FORMATION RADAR */}
      <div className={`${isZoomed ? 'fixed inset-0 z-50 bg-slate-950 p-4' : 'relative'}`}>
        {/* Zoom Toggle Button */}
        <button 
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-2 right-2 z-10 p-2 bg-white/5 rounded-lg sm:hidden text-white text-xs"
        >
          {isZoomed ? '✕ Close' : '🔍 Zoom'}
        </button>
        
        <ChartContainer title="Entity Formation Radar" subtitle="Semantic Density vs. Velocity">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mergedData}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={(props: any) => {
                  const { x, y, payload } = props;
                  
                  // Safety check: if Recharts hasn't calculated x/y yet, return null
                  if (x === undefined || y === undefined) return <g />;

                  return (
                    <g transform={`translate(${x},${y})`}>
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

      {/* 🧠 FORMATION LEADERBOARD */}
      <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
        <h3 className="text-white font-bold mb-4">Formation Leaderboard</h3>
        <div className="space-y-4">
          {mergedData.map(item => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-white/5">
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-[10px] text-slate-500 uppercase">Target: {item.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-xs font-bold ${item.trend === '▲' ? 'text-green-400' : item.trend === '▼' ? 'text-rose-400' : 'text-slate-400'}`}>
                    {item.trend} {item.formationScore}
                  </p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Formation Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📈 CATEGORY OWNERSHIP BAR */}
      <div className="lg:col-span-2">
        <ChartContainer title="Category Ownership" subtitle="Branded vs. Non-Branded Market Capture">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mergedData} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={100} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} 
              />
              <Legend iconType="circle" verticalAlign="top" align="right" />
              <Bar dataKey="branded" stackId="a" fill="#334155" name="Branded Clicks" />
              <Bar dataKey="nonBranded" stackId="a" fill="#60a5fa" name="Non-Branded Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
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