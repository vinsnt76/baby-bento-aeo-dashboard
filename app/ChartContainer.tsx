'use client';

import React from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: ChartContainerProps) {
  return (
    <div className="bg-slate-900/40 p-4 sm:p-6 rounded-2xl border border-white/5 overflow-hidden flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-[10px] text-slate-500 uppercase mt-0.5">{subtitle}</p>}
        </div>
      </div>
      
      {/* FIX: Removed h-[350px]. 
          Using aspect-square (1:1) on mobile and aspect-video (16:9) or custom ratio on desktop.
      */}
      <div className="w-full aspect-square sm:aspect-auto sm:h-[400px] flex items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}