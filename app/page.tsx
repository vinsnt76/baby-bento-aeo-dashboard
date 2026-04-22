import React from 'react';
import QueryIntentPanel from '@/components/QueryIntentPanel';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#2A1A5E] bg-fixed font-sans text-[#2D334A] pb-20 dashboard-container">
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-12 animate-fadeIn">
        <header className="bg-[#F8F5F1] text-[#2D334A] p-8 shadow-lg rounded-xl flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-[#2D334A]">
            Intent Intelligence Engine
          </h1>
          <p className="text-xs font-bold tracking-widest text-[#FF6F61] uppercase">
            Semantic Fan-out & Search Intent Analysis
          </p>
        </header>
        <QueryIntentPanel />
      </main>
    </div>
  );
}