'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useStore } from './useStore';
import ChartContainer from './ChartContainer';

export default function CategoryOwnership() {
  const { mergedData } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  // HYDRATION GUARD: Prevents Recharts from measuring a 0px container on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // DATA GUARD: If no data exists, show a localized skeleton instead of crashing
  if (!isMounted || !mergedData || mergedData.length === 0) {
    return (
      <ChartContainer title="Category Ownership" subtitle="Market Capture Loading...">
        <div className="w-full h-full flex items-center justify-center bg-slate-800/10 animate-pulse rounded-xl">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Awaiting Semantic Data...</p>
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer 
      title="Category Ownership" 
      subtitle="Branded vs. Non-Branded Market Capture"
    >
      <div className="w-full h-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mergedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              width={100}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '11px'
              }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase' }}
            />
            
            {/* THE STACKED BARS: Referencing the store-aligned keys */}
            <Bar 
              dataKey="branded" 
              name="Branded" 
              stackId="a" 
              fill="#334155" 
              barSize={12}
            />
            <Bar 
              dataKey="nonBranded" 
              name="Non-Branded (Discovery)" 
              stackId="a" 
              fill="#60a5fa" 
              radius={[0, 4, 4, 0]} 
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}