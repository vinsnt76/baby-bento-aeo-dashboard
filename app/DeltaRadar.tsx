'use client';

import React, { useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { VELOCITY_DEC_25 } from './velocity-dec-25';

interface DeltaRadarProps {
  currentData: any[];
  previousData: any[];
}

export default function DeltaRadar({ currentData, previousData }: DeltaRadarProps) {
  
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
        text: `${topOwner.name} leads in non-branded discovery. This entity is successfully decoupling from brand-only searches.`,
        color: "blue"
      },
      momentum: {
        title: "Momentum Alert",
        text: `${topClimber.name} shows the strongest velocity (Score: ${topClimber.formationScore}). Expect increased AI-overviews for this node shortly.`,
        color: "pink"
      },
      action: {
        title: "Next Best Action",
        text: `Priority: ${weakestNode.name}. Low semantic density detected. Deploy FAQ schema or supporting articles to reinforce this entity's 'Establishing' phase.`,
        color: "slate"
      }
    };
  }, [mergedData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-slate-900 rounded-xl border border-white/5">
      
      {/* 📊 ENTITY FORMATION RADAR */}
      <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
        <h3 className="text-white font-bold mb-4 flex justify-between">
          Entity Formation Radar
          <span className="text-[10px] text-blue-400 uppercase tracking-widest">Semantic Health</span>
        </h3>
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={mergedData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar
                name="Formation"
                dataKey="Overlap"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.3}
              />
              <Radar
                name="Momentum"
                dataKey="Momentum"
                stroke="#f472b6"
                fill="#f472b6"
                fillOpacity={0.3}
              />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
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
                  <p className={`text-xs font-bold ${item.trend === '▲' ? 'text-green-400' : 'text-rose-400'}`}>
                    {item.trend} {item.formationScore.toFixed(0)}
                  </p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Formation Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📈 CATEGORY OWNERSHIP BAR */}
      <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 lg:col-span-2">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-white font-bold">Category Ownership</h3>
            <p className="text-xs text-slate-400">Branded vs. Non-Branded Market Capture</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase">Avg. Ownership Score</span>
            <p className="text-xl font-mono font-black text-blue-400">84%</p>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mergedData} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={100} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} 
              />
              <Legend iconType="circle" verticalAlign="top" align="right" />
              <Bar dataKey="branded" stackId="a" fill="#334155" name="Branded Clicks" radius={[0, 0, 0, 0]} />
              <Bar dataKey="nonBranded" stackId="a" fill="#60a5fa" name="Non-Branded Clicks" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🧠 STRATEGIC INSIGHT ENGINE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 lg:col-span-2">
        {Object.values(insights).map((insight: any) => (
          <div key={insight.title} className={`p-4 rounded-lg border ${
            insight.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' :
            insight.color === 'pink' ? 'bg-pink-500/10 border-pink-500/20' :
            'bg-slate-800 border-white/5'
          }`}>
            <h4 className={`text-xs font-black uppercase mb-1 ${
              insight.color === 'blue' ? 'text-blue-400' :
              insight.color === 'pink' ? 'text-pink-400' :
              'text-slate-400'
            }`}>
              {insight.title}
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}