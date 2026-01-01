'use client';

import React from 'react';

/**
 * 1. DATA LAYER
 * Swap these values as you update your exports from Search Console/Shopify.
 */
const BASELINE_DATE = "Nov 2025";
const CURRENT_DATE = "Dec 2025";

const AEO_SCORECARDS = [
  { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", color: "border-blue-100 text-blue-600", desc: "How often AI choose us as the primary answer." },
  { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", color: "border-purple-100 text-purple-600", desc: "Our trust score in Google's Shopping Brain." },
  { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", color: "border-green-100 text-green-600", desc: "Total times our 'Atomic Chunks' were served." },
  { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", color: "border-orange-100 text-orange-600", desc: "Active pages with deep semantic schema." }
];

const VELOCITY_DATA = [
  { 
    url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", 
    intent: "Commercial",
    baseline: 647, 
    current: 2130,
    lift: "+229%", 
    status: "Buoyant", 
    rich: "Product Snippets",
    style: "text-green-600 bg-green-50"
  },
  { 
    url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", 
    intent: "Informational",
    baseline: 0, 
    current: 433,
    lift: "NEW", 
    status: "Establishing", 
    rich: "How-To / FAQ",
    style: "text-blue-600 bg-blue-50"
  },
  { 
    url: "/products/lilac-montiico-750ml-sport-drink-bottle", 
    intent: "Transactional",
    baseline: 0, 
    current: 18,
    lift: "Merchant Lift", 
    status: "Establishing",
    rich: "Merchant Listing",
    style: "text-blue-600 bg-blue-50"
  },
  { 
    url: "/blogs/recipes/easy-sushi-maker-kids-bento", 
    intent: "Informational",
    baseline: 0, 
    current: 21,
    lift: "Stalled", 
    status: "Missing", 
    rich: "None",
    style: "text-red-600 bg-red-50"
  }
];

/**
 * 2. MAIN COMPONENT
 */
export default function AEOCommandCenter() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Live AEO Intelligence</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-gray-900">
              Baby Bento <span className="text-blue-600">Command</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">Velocity Tracker: {BASELINE_DATE} Baseline vs. {CURRENT_DATE} Growth</p>
          </div>
          <div className="flex gap-3">
            <div className="px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Global Trust</p>
              <p className="text-sm font-bold">Merchant Position: <span className="text-purple-600 underline">2.85</span></p>
            </div>
          </div>
        </header>

        {/* SECTION 1: AEO SCORECARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {AEO_SCORECARDS.map((card, i) => (
            <div key={i} className={`bg-white p-6 rounded-4xl border-2 shadow-sm transition-transform hover:scale-[1.02] ${card.color}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">{card.label}</p>
              <h3 className="text-4xl font-black text-gray-900 leading-none mb-2">{card.val}</h3>
              <p className="text-xs font-bold opacity-80 mb-4">{card.sub}</p>
              <p className="text-[11px] leading-relaxed text-gray-500 border-t border-current pt-3 opacity-60 italic">{card.desc}</p>
            </div>
          ))}
        </section>

        {/* SECTION 2: INTENT FAN-OUT ANALYSIS */}
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Query Intent Fan-out & Insights</h2>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 border-b-blue-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <p className="text-blue-600 font-black text-xs uppercase tracking-tighter">Commercial Intent</p>
              <span className="text-2xl font-black italic opacity-20">84%</span>
            </div>
            <h4 className="text-xl font-black mb-3 text-gray-800 tracking-tight">Comparison Dominance</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">High buoyancy on "Best of" queries. Google trusts our curation for high-value bento lunch bags.</p>
            <div className="bg-blue-600 text-white p-5 rounded-2xl">
              <p className="text-[10px] font-black uppercase mb-1 opacity-70">Actionable Play:</p>
              <p className="text-xs font-bold leading-snug italic">"winning retrieval but missing conversions. Add 'Check Price' buttons directly to comparison tables."</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-green-50 border-b-green-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <p className="text-green-600 font-black text-xs uppercase tracking-tighter">Informational Intent</p>
              <span className="text-2xl font-black italic opacity-20">12%</span>
            </div>
            <h4 className="text-xl font-black mb-3 text-gray-800 tracking-tight">Knowledge Retrieval</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">Capturing "How-to" traffic. Our sushi maker and chopstick guides are establishing nodes.</p>
            <div className="bg-green-600 text-white p-5 rounded-2xl">
              <p className="text-[10px] font-black uppercase mb-1 opacity-70">Actionable Play:</p>
              <p className="text-xs font-bold leading-snug italic">"Inject VideoObject schema. Google is fanning out informational intent to video-first snippets."</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-purple-50 border-b-purple-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <p className="text-purple-600 font-black text-xs uppercase tracking-tighter">Transactional Intent</p>
              <span className="text-2xl font-black italic opacity-20">04%</span>
            </div>
            <h4 className="text-xl font-black mb-3 text-gray-800 tracking-tight">Direct Conversions</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">Merchant Listing visibility is currently low. Potential leakage for specific SKU searches.</p>
            <div className="bg-purple-600 text-white p-5 rounded-2xl">
              <p className="text-[10px] font-black uppercase mb-1 opacity-70">Actionable Play:</p>
              <p className="text-xs font-bold leading-snug italic">"Audit Merchant Center for 'Missing GTINs'. Google won't retrieve product nodes without manufacturer IDs."</p>
            </div>
          </div>

        </section>

        {/* SECTION 3: VELOCITY TABLE */}
        <section className="bg-white rounded-[3rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-black italic tracking-tighter">Optimization Velocity (Delta Tracker)</h2>
            <span className="px-4 py-1 bg-black text-white text-[10px] font-black rounded-full uppercase tracking-widest">Post-Retrieval Data</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-black tracking-widest text-gray-400 bg-white">
                <tr>
                  <th className="px-10 py-6">Knowledge Node</th>
                  <th className="px-10 py-6">Intent</th>
                  <th className="px-10 py-6">Impressions Delta</th>
                  <th className="px-10 py-6 text-right">AEO Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VELOCITY_DATA.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50 transition-all cursor-default">
                    <td className="px-10 py-8">
                      <p className="font-bold text-sm text-gray-900 mb-1 group-hover:text-blue-600">{row.url}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{row.rich}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-[10px] font-black border-2 border-gray-100 px-3 py-1.5 rounded-xl text-gray-500 uppercase">{row.intent}</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col leading-none">
                        <span className="text-xl font-black text-gray-900 mb-1">{row.current.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{row.lift} from {row.baseline}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${row.style}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FOOTER ADVISORY */}
        <footer className="mt-12 text-center">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.5em]">End of Intelligence Report • {CURRENT_DATE}</p>
        </footer>

      </main>
    </div>
  );
}