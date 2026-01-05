'use client';

import React from 'react';

export default function ChartContainer({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full bg-gray-900/50 rounded-2xl border border-white/5 p-6 min-h-[420px]">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
        {subtitle && (
          <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 w-full min-w-0 min-h-[350px] relative">
        {children}
      </div>
    </div>
  );
}