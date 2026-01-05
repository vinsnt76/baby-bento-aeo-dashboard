'use client';

import React from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: ChartContainerProps) {
  return (
    <div className="flex flex-col w-full bg-slate-900/40 rounded-2xl border border-white/5 p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* CRITICAL: We keep [350px] to provide a hard floor for Recharts. 
          The 'relative' class allows the ResponsiveContainer to 'stick' to these bounds.
      */}
      <div className="w-full min-h-[350px] min-w-0 relative flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}