import React from 'react';
import Image from 'next/image';
import DownloadButton from './DownloadButton';

export const metadata = {
  title: "Baby Bento Dashboard – December 25 Baseline Performance",
};

const VELOCITY_DATA = [
  { url: "/blogs/product-review/australia-insulated-lunch-bags-top-brands-2026", intent: "Commercial", baseline: 647, current: 2130, lift: "+229%", status: "Buoyant", rich: "Product Snippets", style: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  { url: "/blogs/product-review/lunchbox-solutions-for-busy-parents", intent: "Informational", baseline: 0, current: 433, lift: "NEW", status: "Establishing", rich: "How-To / FAQ", style: "bg-blue-100 text-blue-800 border border-blue-200" },
  { url: "/products/lilac-montiico-750ml-sport-drink-bottle", intent: "Transactional", baseline: 0, current: 18, lift: "First Hit", status: "Establishing", rich: "Merchant Listing", style: "bg-blue-100 text-blue-800 border border-blue-200" },
  { url: "/blogs/recipes/easy-sushi-maker-kids-bento", intent: "Informational", baseline: 0, current: 21, lift: "Stalled", status: "Missing", rich: "None", style: "bg-[#FF6F61]/10 text-[#FF6F61] border border-[#FF6F61]/20" }
];

export default function BabyBentoDashboard() {
  return (
    /* 1. GLOBAL BACKGROUND: Multi-point Radial Mesh Gradient */
    <div className="min-h-screen bg-[radial-gradient(at_top_left,#2A1A5E_0%,transparent_50%),radial-gradient(at_bottom_right,#0F4C75_0%,transparent_50%),radial-gradient(at_center,#3A2F8F_10%,transparent_80%)] bg-fixed font-sans text-[#2D334A] pb-20" style={{ backgroundColor: '#2A1A5E' }}>
      
      <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-24 animate-fadeIn">
        
        {/* 2. REPORT HEADER: Unicorn White */ }
        <header className="bg-[#F8F5F1] text-[#2D334A] p-8 shadow-lg rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            {/* FIXED: Defined height/width parent for Next.js Image */}
            <div className="relative w-24 h-24 shrink-0 drop-shadow-md">
               <Image 
                src="/baby-bento-logo.svg"
                alt="Baby Bento Logo" 
                width={96}
                height={96}
                className="drop-shadow-md"
                priority
               />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#2D334A]">
                Baby Bento Dashboard
              </h1>
              <p className="text-sm tracking-wide text-[#6B7280] mt-1">DECEMBER 25 BASELINE PERFORMANCE</p>
              <p className="text-xs font-bold tracking-widest text-[#FF6F61] mt-1">AEO INTELLIGENCE REPORT</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DownloadButton />
            <div className="px-6 py-3 bg-[#2D334A] text-white rounded-xl text-xs font-black shadow-xl uppercase tracking-widest transform hover:scale-105 transition-transform">
              Merchant Pos: <span className="text-[#79D2B5]">2.85</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: SCORECARDS */}
        <section>
          <div className="inline-block rounded-md bg-[#FF6F61] text-white px-4 py-2 font-semibold uppercase tracking-widest text-sm mb-8 shadow-lg">
             AEO Strategic Health
          </div>

          {/* 4. SCORECARDS: White backgrounds + Dark Navy Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Selection Efficiency", val: "10.7%", sub: "Peak AEO CTR", border: "border-[#FCD34D]" },
              { label: "Model Authority", val: "2.85", sub: "Avg. Merchant Pos", border: "border-[#A7F3D0]" },
              { label: "Retrieval Volume", val: "22.8k", sub: "Rich Impressions", border: "border-[#7DD3FC]" },
              { label: "Knowledge Nodes", val: "08", sub: "Optimized Entities", border: "border-[#FCA5A5]" }
            ].map((card, i) => (
              <div key={i} className={`bg-[#F8F5F1] rounded-xl p-6 shadow-sm border-4 ${card.border} transform transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-800 mb-3">{card.label}</p>
                <h3 className="text-4xl font-black text-[#2D334A]">{card.val}</h3>
                <p className="text-[11px] mt-2 font-medium italic text-gray-700 opacity-100">{card.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEMANTIC RETRIEVAL STATUS & RECOMMENDATION */}
        <section className="max-w-7xl mx-auto bg-gray-700 rounded-3xl p-8 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                AEO Strategic Health Breakdown
              </h4>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                    <span className="text-green-400">Buoyant (Retrieved)</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-green-400 h-full w-[25%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                    <span className="text-blue-400">Establishing</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-blue-400 h-full w-[25%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                    <span className="text-red-400">Missing (Technical Debt)</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-red-400 h-full w-[50%]"></div></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
              <h5 className="text-xs font-bold text-yellow-100 uppercase mb-3 tracking-widest">Key Insights & Recommendations</h5>
              <p className="text-lg font-medium text-gray-200 leading-snug">
                "We are successfully winning <span className="text-white border-b-2 border-yellow-500">Selection</span> with 10%+ CTRs on top queries. 50% of nodes are currently 'Blind' to AI crawlers. Priority: Inject FAQ/Product schema into the <strong>Sushi Maker</strong> and <strong>Accessories</strong> nodes immediately to capture 2026 search trends."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTENT FAN-OUT */}
        <section>
          <div className="inline-block rounded-md bg-[#FF6F61] text-white px-4 py-2 font-semibold uppercase tracking-widest text-sm mb-8 shadow-lg">
             Query Intent Fan-Out
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Commercial", weight: "84%", play: "Add 'Check Price' to tables." },
              { title: "Informational", weight: "12%", play: "Inject VideoObject schema." },
              { title: "Transactional", weight: "04%", play: "Audit GTINs in Merchant Center." }
            ].map((intent, i) => (
              <div key={i} className="bg-[#2D334A]/80 backdrop-blur-md p-8 rounded-4xl border border-white/10 shadow-inner group hover:shadow-[0_0_30px_rgba(252,211,77,0.15)] transition-all duration-300">
                <p className="font-black text-xs uppercase tracking-tighter text-white leading-relaxed mb-2">{intent.title} Intent</p>
                <span className="text-5xl font-black italic text-[#FEF3C7] tracking-tight">{intent.weight}</span>
                <div className="mt-8 p-5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  <p className="text-[10px] font-black uppercase text-[#FF6F61] mb-1">Strategic Play</p>
                  <p className="text-sm font-bold text-white italic leading-snug">{intent.play}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: VELOCITY TABLE */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div className="inline-block rounded-md bg-[#FF6F61] text-white px-4 py-2 font-semibold uppercase tracking-widest text-sm shadow-lg">
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