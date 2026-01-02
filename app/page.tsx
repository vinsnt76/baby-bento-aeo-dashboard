'use client';

import React from 'react';
import Image from 'next/image';

const VELOCITY_DATA = [
  { url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", intent: "Commercial", baseline: 647, current: 2130, lift: "+229%", status: "Buoyant", rich: "Product Snippets", style: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  { url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", intent: "Informational", baseline: 0, current: 433, lift: "NEW", status: "Establishing", rich: "How-To / FAQ", style: "bg-blue-100 text-blue-800 border border-blue-200" },
  { url: "/products/lilac-montiico-750ml-sport-drink-bottle", intent: "Transactional", baseline: 0, current: 18, lift: "First Hit", status: "Establishing", rich: "Merchant Listing", style: "bg-blue-100 text-blue-800 border border-blue-200" },
  { url: "/blogs/recipes/easy-sushi-maker-kids-bento", intent: "Informational", baseline: 0, current: 21, lift: "Stalled", status: "Missing", rich: "None", style: "bg-[#FF6F61]/10 text-[#FF6F61] border border-[#FF6F61]/20" }
];

export default function BabyBentoDashboard() {
  return (
    /* 1. GLOBAL BACKGROUND: Deep atmospheric mesh gradient */
    <div className="min-h-screen relative bg-[#0f172a] font-sans text-white pb-24 overflow-hidden selection:bg-[#FCD34D] selection:text-[#2D334A]">
      {/* Noise Overlay & Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2A1A5E_0%,transparent_50%),radial-gradient(circle_at_top_right,#3A2F8F_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#1E3A8A_0%,transparent_50%),radial-gradient(circle_at_bottom_right,#0F4C75_0%,transparent_50%)] opacity-80 mix-blend-normal"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      </div>
      
      <main className="relative z-10 max-w-7xl mx-auto p-6 md:p-12 space-y-24 animate-fadeIn">
        
        {/* 2. REPORT HEADER: Soft radial gradient with Logo */}
        <header className="overflow-hidden rounded-3xl shadow-2xl shadow-black/30 bg-[radial-gradient(at_top_left,#FFF5F2_0%,#FFFFFF_40%,#F0FDF4_100%)] text-[#2D334A] p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/20">
          <div className="flex items-center gap-5">
            {/* FIXED: Defined height/width parent for Next.js Image */}
            <div className="relative w-24 h-24 shrink-0 drop-shadow-lg">
               <Image 
                src="/logo.svg"
                alt="Baby Bento Logo" 
                width={96}
                height={96}
                className="drop-shadow-lg"
                priority
               />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-[#2D334A] drop-shadow-sm">
                Baby Bento Dashboard – Dec 2025
              </h1>
              <p className="text-[#FF8A75] text-sm font-bold uppercase tracking-[0.3em] mt-3 ml-1">AEO Intelligence Command</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-[#2D334A] text-white rounded-xl text-xs font-black shadow-xl uppercase tracking-widest transform hover:scale-105 transition-transform">
            Merchant Pos: <span className="text-[#79D2B5]">2.85</span>
          </div>
        </header>

        {/* SECTION 1: SCORECARDS */}
        <section>
          <div className="inline-block rounded-md bg-[#FCD34D] text-[#2D334A] px-4 py-2 font-semibold uppercase tracking-widest text-sm mb-8 shadow-lg">
             AEO Strategic Health
          </div>

          {/* 4. SCORECARDS: White backgrounds + Dark Navy Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR" },
              { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos" },
              { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions" },
              { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities" }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-[#E5E7EB] transform transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">{card.label}</p>
                <h3 className="text-4xl font-black text-[#2D334A]">{card.val}</h3>
                <p className="text-[11px] mt-2 font-medium italic text-gray-500 opacity-80">{card.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: INTENT FAN-OUT */}
        <section>
          <div className="inline-block rounded-md bg-[#FCD34D] text-[#2D334A] px-4 py-2 font-semibold uppercase tracking-widest text-sm mb-8 shadow-lg">
             Query Intent Fan-Out
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Commercial", weight: "84%", play: "Add 'Check Price' to tables." },
              { title: "Informational", weight: "12%", play: "Inject VideoObject schema." },
              { title: "Transactional", weight: "04%", play: "Audit GTINs in Merchant Center." }
            ].map((intent, i) => (
              <div key={i} className="bg-[#2D334A]/80 backdrop-blur-md p-8 rounded-4xl border border-white/10 shadow-inner group hover:shadow-[0_0_30px_rgba(252,211,77,0.15)] transition-all duration-300">
                <p className="font-black text-xs uppercase tracking-tighter text-[#FCD34D] mb-2">{intent.title} Intent</p>
                <span className="text-5xl font-black italic text-[#FEF3C7] tracking-tight">{intent.weight}</span>
                <div className="mt-8 p-5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black uppercase text-[#FAA1A1] mb-1">Strategic Play</p>
                  <p className="text-sm font-bold text-white italic leading-snug">{intent.play}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: VELOCITY TABLE */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div className="inline-block rounded-md bg-[#FCD34D] text-[#2D334A] px-4 py-2 font-semibold uppercase tracking-widest text-sm shadow-lg">
               Optimization Velocity
            </div>
            <span className="text-[10px] font-black bg-[#2D334A] text-white px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Post-Retrieval Data</span>
          </div>

          <div className="bg-[#1e1b4b]/60 backdrop-blur-md rounded-4xl shadow-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto max-h-150">
              <table className="w-full text-left border-collapse">
                <thead className="text-[10px] uppercase font-black tracking-widest text-white/40 bg-[#0f172a]/90 sticky top-0 backdrop-blur-md z-10">
                  <tr>
                    <th className="px-8 py-6">Knowledge Node</th>
                    <th className="px-8 py-6 text-center">Intent</th>
                    <th className="px-8 py-6 text-center">Retrieval Lift</th>
                    <th className="px-8 py-6 text-right">AEO Status</th>
                  </tr>
                </thead>
                <tbody className="text-white divide-y divide-white/5">
                  {VELOCITY_DATA.map((row, idx) => (
                    <tr key={idx} className="group border-b border-white/5 last:border-0 even:bg-[#2D334A]/20 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-8">
                        <p className="font-bold text-sm group-hover:text-[#FCD34D] transition-colors">{row.url}</p>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{row.rich}</p>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <span className="text-[9px] font-black border border-white/10 px-3 py-1.5 rounded-lg text-white/50 uppercase tracking-tighter">{row.intent}</span>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <div className="flex flex-col items-center leading-none">
                          <span className="text-xl font-black mb-1">{row.current.toLocaleString()}</span>
                          <span className="text-[10px] font-black text-[#79D2B5] uppercase">{row.lift}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-right">
                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${row.style}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}