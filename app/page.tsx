'use client';

import React from 'react';

// BRAND COLOR TOKENS (CSS Variables for easy updating)
const BB_COLORS = {
  primary: '#FF8A75',   // Warm Peach
  secondary: '#79D2B5', // Mint Green
  accent: '#2D334A',    // Deep Navy
  light: '#FFF5F2',     // Soft Cream
};

const VELOCITY_DATA = [
  { 
    url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", 
    intent: "Commercial",
    baseline: 647, 
    current: 2130,
    lift: "+229%", 
    status: "Buoyant", 
    rich: "Product Snippets",
    style: "text-[#79D2B5] bg-[#79D2B5]/10 border-[#79D2B5]/20"
  },
  { 
    url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", 
    intent: "Informational",
    baseline: 0, 
    current: 433,
    lift: "NEW", 
    status: "Establishing", 
    rich: "How-To / FAQ",
    style: "text-[#FF8A75] bg-[#FF8A75]/10 border-[#FF8A75]/20"
  },
  { 
    url: "/products/lilac-montiico-750ml-sport-drink-bottle", 
    intent: "Transactional",
    baseline: 0, 
    current: 18,
    lift: "First Hit", 
    status: "Establishing",
    rich: "Merchant Listing",
    style: "text-[#FF8A75] bg-[#FF8A75]/10 border-[#FF8A75]/20"
  },
  { 
    url: "/blogs/recipes/easy-sushi-maker-kids-bento", 
    intent: "Informational",
    baseline: 0, 
    current: 21,
    lift: "Stalled", 
    status: "Missing", 
    rich: "None",
    style: "text-red-400 bg-red-400/10 border-red-400/20"
  }
];

export default function BabyBentoDashboard() {
  return (
    /* 1. GLOBAL BACKGROUND: Deep atmospheric mesh-style gradient */
    <div className="min-h-screen bg-[#2A1A5E] bg-[radial-gradient(at_0%_0%,_#2A1A5E_0%,_transparent_50%),_radial-gradient(at_50%_0%,_#3A2F8F_0%,_transparent_50%),_radial-gradient(at_50%_50%,_#1E3A8A_0%,_transparent_50%),_radial-gradient(at_100%_100%,_#0F4C75_0%,_transparent_50%)] font-sans text-[#EAF2FF] pb-20">
      
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* 2. REPORT HEADER: Soft, airy radial gradient container */}
        <header className="mb-12 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10">
          <div className="bg-[radial-gradient(at_top_left,_#FFF5F2_0%,_#FFFFFF_40%,_#F0FDF4_100%)] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-[#2D334A]">
            
            {/* 4. LOGO INTEGRATION & TITLE */}
            <div className="flex items-center gap-6">
              {/* Rounded, friendly Bento-style icon */}
              <div className="w-16 h-16 bg-[#2D334A] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF8A75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                   <polyline points="9 22 9 12 15 12 15 22"></polyline>
                 </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase italic leading-none">
                  Baby Bento Dashboard – Dec 2025
                </h1>
                <p className="text-[#FF8A75] text-xs font-bold uppercase tracking-[0.3em] mt-2">AEO Intelligence & Intent Fan-out</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-5 py-2 bg-[#2D334A] text-white rounded-xl text-xs font-black shadow-lg uppercase tracking-widest">
                Merchant Pos: <span className="text-[#79D2B5]">2.85</span>
              </div>
            </div>
          </div>
        </header>

        {/* SECTION: AEO SCORECARDS (Glassmorphism on Dark Gradient) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", color: "border-[#FF8A75]/30 text-[#FF8A75]" },
            { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", color: "border-[#79D2B5]/30 text-[#79D2B5]" },
            { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", color: "border-white/10 text-white" },
            { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", color: "border-[#FF8A75]/30 text-[#FF8A75]" }
          ].map((card, i) => (
            <div key={i} className={`bg-white/5 backdrop-blur-xl p-6 rounded-4xl border shadow-2xl transition-all hover:translate-y-[-4px] ${card.color}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{card.label}</p>
              <h3 className="text-4xl font-black">{card.val}</h3>
              <p className="text-[11px] mt-2 font-medium italic opacity-40">{card.sub}</p>
            </div>
          ))}
        </section>

        {/* SECTION: INTENT FAN-OUT (Actionable Insights) */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[2px] w-8 bg-[#FF8A75]"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Query Intent Fan-out</h2>
        </div>
        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Commercial", weight: "84%", color: "#79D2B5", desc: "Best-of comparison dominance.", play: "Add 'Check Price' to tables." },
            { title: "Informational", weight: "12%", color: "#FF8A75", desc: "How-to guides & recipes.", play: "Inject VideoObject schema." },
            { title: "Transactional", weight: "04%", color: "#EAF2FF", desc: "Direct product SKU searches.", play: "Audit GTINs in Merchant Center." }
          ].map((intent, i) => (
            <div key={i} className="bg-[#2D334A]/40 backdrop-blur-md p-8 rounded-4xl border border-white/5 shadow-inner relative group transition-all hover:bg-[#2D334A]/60">
              <div className="flex justify-between items-start mb-6">
                <p className={`font-black text-xs uppercase tracking-tighter`} style={{ color: intent.color }}>{intent.title}</p>
                <span className="text-3xl font-black italic opacity-10">{intent.weight}</span>
              </div>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">{intent.desc}</p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-black uppercase mb-1 opacity-50">Strategic Play:</p>
                <p className="text-xs font-bold italic leading-snug text-white">{intent.play}</p>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION: VELOCITY TABLE (Contrast Optimized) */}
        <section className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden mb-12">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h2 className="text-lg font-black italic uppercase tracking-tighter text-[#79D2B5]">Optimization Velocity</h2>
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Dec 2025 Cycle</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-black tracking-widest text-white/20">
                <tr>
                  <th className="px-10 py-6">Node / Rich Result</th>
                  <th className="px-10 py-6 text-center">Intent</th>
                  <th className="px-10 py-6 text-center">Retrieval Lift</th>
                  <th className="px-10 py-6 text-right">AEO Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {VELOCITY_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition-colors">
                    <td className="px-10 py-8">
                      <p className="font-bold text-sm text-white group-hover:text-[#FF8A75] transition-colors">{row.url}</p>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">{row.rich}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="text-[9px] font-black border border-white/10 px-3 py-1.5 rounded-lg text-white/40 uppercase tracking-tighter">{row.intent}</span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xl font-black text-white leading-none mb-1">{row.current.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[#79D2B5] uppercase">{row.lift}</span>
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

        {/* SEMANTIC PROGRESS BARS */}
        <section className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 text-center">Semantic Network Coverage</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Buoyant", color: "#79D2B5", p: "25%" },
              { label: "Establishing", color: "#FF8A75", p: "25%" },
              { label: "Missing", color: "#2D334A", p: "50%" }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex justify-between w-full text-[10px] font-black uppercase mb-3">
                  <span style={{ color: bar.color }}>{bar.label}</span>
                  <span className="text-white/40">{bar.p}</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: bar.p, backgroundColor: bar.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}