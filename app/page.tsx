'use client';

import React from 'react';

// 1. DATA LAYER (Externalized to prevent syntax noise)
const VELOCITY_DATA = [
  { 
    url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", 
    baseline: 647, 
    current: 2130,
    lift: "+229%", 
    status: "Buoyant", 
    rich: "Product Snippets",
    style: "text-green-600 bg-green-50"
  },
  { 
    url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", 
    baseline: 0, 
    current: 433,
    lift: "NEW", 
    status: "Establishing", 
    rich: "How-To / FAQ",
    style: "text-blue-600 bg-blue-50"
  },
  { 
    url: "/products/lilac-montiico-750ml-sport-drink-bottle", 
    baseline: 0, 
    current: 18,
    lift: "First Hit", 
    status: "Establishing",
    rich: "Merchant Listing",
    style: "text-blue-600 bg-blue-50"
  },
  { 
    url: "/blogs/recipes/easy-sushi-maker-kids-bento", 
    baseline: 0, 
    current: 21,
    lift: "Stalled", 
    status: "Missing", 
    rich: "None",
    style: "text-red-600 bg-red-50"
  }
];

// 2. COMPONENT RENDER
export default function AEOCommandCenter() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Baby Bento AEO Command</h1>
            <p className="text-gray-500 font-medium">Velocity Tracker • Baseline (Nov) vs. Performance (Dec)</p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm">
              Merchant Pos: <span className="text-purple-600 italic">2.85</span>
            </div>
            <div className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold shadow-lg shadow-black/20">
              AEO LIVE
            </div>
          </div>
        </header>

        {/* SCORECARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", color: "border-blue-100 text-blue-600" },
            { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", color: "border-purple-100 text-purple-600" },
            { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", color: "border-green-100 text-green-600" },
            { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", color: "border-orange-100 text-orange-600" }
          ].map((card, i) => (
            <div key={i} className={`bg-white p-6 rounded-3xl border-2 shadow-sm transition-all hover:scale-[1.02] ${card.color}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{card.label}</p>
              <h3 className="text-4xl font-black text-gray-900">{card.val}</h3>
              <p className="text-xs text-gray-400 mt-2 font-medium italic">{card.sub}</p>
            </div>
          ))}
        </section>

        {/* VELOCITY TABLE */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-800">Optimization Velocity</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Retrieval Era Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5">Knowledge Node</th>
                  <th className="px-8 py-5 text-center">Impression Delta</th>
                  <th className="px-8 py-5 text-center">Lift</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VELOCITY_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{row.url}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{row.rich}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex flex-col">
                        <span className="text-lg font-black text-gray-900 leading-none mb-1">{row.current.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">vs {row.baseline}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center text-sm font-black text-gray-900">
                      {row.lift}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${row.style}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* STRATEGY RECOMMENDATION */}
        <section className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h4 className="text-2xl font-black mb-8 flex items-center gap-3 italic tracking-tighter">
                <span className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></span>
                SEMANTIC HEALTH
              </h4>
              <div className="space-y-8">
                {[
                  { label: "Buoyant", color: "bg-green-400", w: "w-1/4", p: "25%" },
                  { label: "Establishing", color: "bg-blue-400", w: "w-1/4", p: "25%" },
                  { label: "Missing", color: "bg-red-400", w: "w-1/2", p: "50%" }
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest">
                      <span className="opacity-60">{bar.label}</span>
                      <span>{bar.p}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                      <div className={`${bar.color} h-full ${bar.w} rounded-full`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                <h5 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">AEO Deployment Strategy</h5>
                <p className="text-xl font-medium leading-relaxed text-gray-200">
                  "Selection Phase is strong (10.7% CTR). Priority shift required: Inject <strong>FAQ + Local Business</strong> schema into the 50% 'Missing' nodes to force retrieval in the 2026 AI-Search index."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}