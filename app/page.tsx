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
    style: "text-red-600 bg-red-50 border-red-100"
  }
];

export default function BabyBentoDashboard() {
  return (
    // GRADIENT BACKGROUND: Subtle modern mesh gradient
    <div className="min-h-screen bg-[radial-gradient(at_top_left,#FFF5F2_0%,#FFFFFF_40%,#F0FDF4_100%)] font-sans text-[#2D334A] pb-20">
      
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* HEADER WITH LOGO INTEGRATION */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* LOGO PLACEHOLDER: Replace src with your actual logo file */}
            <div className="w-12 h-12 bg-[#FF8A75] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF8A75]/20">
               <span className="text-white font-black text-xl italic">BB</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#2D334A]">
                Baby Bento Dashboard – Dec 2025
              </h1>
              <p className="text-[#FF8A75] text-xs font-bold uppercase tracking-[0.2em]">AEO Performance Command</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/80 backdrop-blur-md border border-[#FF8A75]/20 rounded-xl text-xs font-bold shadow-sm">
              Merchant Pos: <span className="text-[#79D2B5] font-black">2.85</span>
            </div>
          </div>
        </header>

        {/* SCORECARDS: Using Brand Accents */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", color: "border-[#FF8A75]/30 text-[#FF8A75]" },
            { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", color: "border-[#79D2B5]/30 text-[#79D2B5]" },
            { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", color: "border-[#2D334A]/10 text-[#2D334A]" },
            { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", color: "border-[#FF8A75]/30 text-[#FF8A75]" }
          ].map((card, i) => (
            <div key={i} className={`bg-white/60 backdrop-blur-md p-6 rounded-4xl border-2 shadow-sm transition-all hover:shadow-xl hover:shadow-[#FF8A75]/5 ${card.color}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{card.label}</p>
              <h3 className="text-4xl font-black">{card.val}</h3>
              <p className="text-[11px] mt-2 font-medium italic opacity-60">{card.sub}</p>
            </div>
          ))}
        </section>

        {/* INTENT FAN-OUT: Brand Colored Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Commercial", weight: "84%", color: "#79D2B5", desc: "Best-of comparison dominance.", play: "Add 'Check Price' to tables." },
            { title: "Informational", weight: "12%", color: "#FF8A75", desc: "How-to guides & recipes.", play: "Inject VideoObject schema." },
            { title: "Transactional", weight: "04%", color: "#2D334A", desc: "Direct product SKU searches.", play: "Audit GTINs in Merchant Center." }
          ].map((intent, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <p className={`font-black text-xs uppercase tracking-tighter`} style={{ color: intent.color }}>{intent.title} Intent</p>
                <span className="text-2xl font-black italic opacity-10">{intent.weight}</span>
              </div>
              <p className="text-xs text-gray-500 mb-6">{intent.desc}</p>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: `${intent.color}15`, border: `1px solid ${intent.color}30` }}>
                <p className="text-[10px] font-black uppercase mb-1" style={{ color: intent.color }}>Action Plan:</p>
                <p className="text-[11px] font-bold italic leading-snug">{intent.play}</p>
              </div>
            </div>
          ))}
        </section>

        {/* VELOCITY TABLE: Styled for Premium Depth */}
        <section className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-50 bg-[#2D334A] text-white flex justify-between items-center">
            <h2 className="text-lg font-black italic uppercase tracking-tighter">Optimization Velocity</h2>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF8A75]"></div>
              <div className="w-2 h-2 rounded-full bg-[#79D2B5]"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-black tracking-widest text-gray-400 bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5">Node / Rich Result</th>
                  <th className="px-8 py-5 text-center">Intent</th>
                  <th className="px-8 py-5 text-center text-[#2D334A]">Retrieval Lift</th>
                  <th className="px-8 py-5 text-right">AEO Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VELOCITY_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-[#FFF5F2]/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-sm text-[#2D334A] group-hover:text-[#FF8A75] transition-colors">{row.url}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">{row.rich}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-[9px] font-black border border-gray-100 px-2 py-1 rounded text-gray-400 uppercase tracking-tighter">{row.intent}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-black text-[#2D334A] leading-none mb-1">{row.current.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[#79D2B5] uppercase">{row.lift}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${row.style}`}>
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
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 text-center">Semantic Network Coverage</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Buoyant", color: "#79D2B5", p: "25%" },
              { label: "Establishing", color: "#FF8A75", p: "25%" },
              { label: "Missing", color: "#2D334A", p: "50%" }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex justify-between w-full text-[10px] font-black uppercase mb-3">
                  <span style={{ color: bar.color }}>{bar.label}</span>
                  <span className="text-gray-400">{bar.p}</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
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