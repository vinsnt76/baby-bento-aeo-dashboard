'use client';

import React from 'react';
import Image from 'next/image';

const VELOCITY_DATA = [
  { url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", intent: "Commercial", baseline: 647, current: 2130, lift: "+229%", status: "Buoyant", rich: "Product Snippets", style: "text-green-600 bg-green-50 border-green-100" },
  { url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", intent: "Informational", baseline: 0, current: 433, lift: "NEW", status: "Establishing", rich: "How-To / FAQ", style: "text-blue-600 bg-blue-50 border-blue-100" },
  { url: "/products/lilac-montiico-750ml-sport-drink-bottle", intent: "Transactional", baseline: 0, current: 18, lift: "First Hit", status: "Establishing", rich: "Merchant Listing", style: "text-blue-600 bg-blue-50 border-blue-100" },
  { url: "/blogs/recipes/easy-sushi-maker-kids-bento", intent: "Informational", baseline: 0, current: 21, lift: "Stalled", status: "Missing", rich: "None", style: "text-[#FF6F61] bg-[#FF6F61]/10 border-[#FF6F61]/20" }
];

export default function BabyBentoDashboard() {
  return (
    /* 1. GLOBAL BACKGROUND: Deep atmospheric mesh gradient */
    <div className="min-h-screen bg-[radial-gradient(at_0%_0%,#2A1A5E_0%,transparent_50%),radial-gradient(at_50%_0%,#3A2F8F_0%,transparent_50%),radial-gradient(at_50%_50%,#1E3A8A_0%,transparent_50%),radial-gradient(at_100%_100%,#0F4C75_0%,transparent_50%)] font-sans text-white pb-20" style={{ backgroundColor: '#2A1A5E' }}>
      
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* 2. REPORT HEADER: Soft radial gradient with Logo */}
        <header className="mb-12 overflow-hidden rounded-2xl shadow-2xl bg-[radial-gradient(at_top_left,#FFF5F2_0%,#FFFFFF_40%,#F0FDF4_100%)] text-[#2D334A] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* FIXED: Defined height/width parent for Next.js Image */}
            <div className="relative w-16 h-16 shrink-0">
               <Image 
                src="/logo.png" 
                alt="Baby Bento Logo" 
                width={64}
                height={64}
                className="object-contain"
                priority
               />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase italic leading-none">
                Baby Bento Dashboard – Dec 2025
              </h1>
              <p className="text-[#FF8A75] text-[10px] font-black uppercase tracking-[0.4em] mt-2">AEO Intelligence Command</p>
            </div>
          </div>
          <div className="px-5 py-2 bg-[#2D334A] text-white rounded-xl text-xs font-black shadow-lg uppercase tracking-widest">
            Merchant Pos: <span className="text-[#79D2B5]">2.85</span>
          </div>
        </header>

        {/* 3. SECTION TILE: Amber Gold Highlight */}
        <div className="inline-block rounded-md bg-[#FCD34D] text-[#2D334A] px-6 py-2 font-black uppercase tracking-widest text-[10px] mb-6 shadow-lg">
           AEO Strategic Health
        </div>

        {/* 4. SCORECARDS: White backgrounds + Dark Navy Text */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", accent: "border-[#FF8A75]" },
            { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", accent: "border-[#79D2B5]" },
            { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", accent: "border-[#2D334A]" },
            { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", accent: "border-[#FF8A75]" }
          ].map((card, i) => (
            <div key={i} className={`bg-white rounded-2xl p-6 shadow-xl border-l-4 ${card.accent} transform transition-transform hover:scale-[1.03]`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{card.label}</p>
              <h3 className="text-4xl font-black text-[#2D334A]">{card.val}</h3>
              <p className="text-[11px] mt-2 font-medium italic text-gray-500 opacity-80">{card.sub}</p>
            </div>
          ))}
        </section>

        {/* 5. INTENT METRIC HIGHLIGHTS: Cyber-Moody Data Core */}
        <div className="inline-block rounded-md bg-[#FCD34D] text-[#2D334A] px-6 py-2 font-black uppercase tracking-widest text-[10px] mb-6 shadow-lg">
           Query Intent Fan-out
        </div>
        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Commercial", weight: "84%", play: "Add 'Check Price' to tables." },
            { title: "Informational", weight: "12%", play: "Inject VideoObject schema." },
            { title: "Transactional", weight: "04%", play: "Audit GTINs in Merchant Center." }
          ].map((intent, i) => (
            <div key={i} className="bg-[#2D334A]/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
              <p className="font-black text-xs uppercase tracking-tighter text-[#FCD34D]">{intent.title} Intent</p>
              <span className="text-4xl font-black italic text-[#FEF3C7]">{intent.weight}</span>
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <p className="text-[10px] font-black uppercase text-[#FAA1A1]">Strategic Play</p>
                <p className="text-xs font-bold text-white italic">{intent.play}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 6. VELOCITY TABLE: Preserving High Readability */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-12 border border-white/10">
          <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center text-[#2D334A]">
            <h2 className="text-lg font-black italic uppercase tracking-tighter">Optimization Velocity</h2>
            <span className="text-[9px] font-black bg-[#2D334A] text-white px-3 py-1 rounded-full uppercase tracking-widest">Post-Retrieval Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-black tracking-widest text-gray-400 bg-gray-50/30">
                <tr>
                  <th className="px-10 py-6">Knowledge Node</th>
                  <th className="px-10 py-6 text-center">Intent</th>
                  <th className="px-10 py-6 text-center">Retrieval Lift</th>
                  <th className="px-10 py-6 text-right">AEO Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#2D334A]">
                {VELOCITY_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-10 py-8">
                      <p className="font-bold text-sm group-hover:text-blue-600 transition-colors">{row.url}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">{row.rich}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="text-[9px] font-black border border-gray-200 px-3 py-1.5 rounded-lg text-gray-400 uppercase tracking-tighter">{row.intent}</span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex flex-col items-center leading-none">
                        <span className="text-xl font-black mb-1">{row.current.toLocaleString()}</span>
                        <span className="text-[10px] font-black text-blue-500 uppercase">{row.lift}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${row.style}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}