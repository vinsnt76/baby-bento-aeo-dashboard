'use client';

import React, { useEffect, useState } from 'react';
import { VELOCITY_DEC_25 } from './velocity-dec-25';
import DeltaRadar from './DeltaRadar';
import { useStore } from './useStore';

export default function AEOView() {
  const { processGscData, selectionEfficiency, modelAuthority, retrievalVolume, knowledgeNodes, mergedData } = useStore();
  const [liveData, setLiveData] = useState<{ current: any[], previous: any[] }>({ current: [], previous: [] });

  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch('/api/gsc/performance');
        const json = await res.json();
        if (json.current) {
          setLiveData(json);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchLive();
  }, []);

  useEffect(() => {
    if (liveData.current.length > 0) {
      processGscData(liveData.current, liveData.previous, VELOCITY_DEC_25);
    }
  }, [liveData, processGscData]);

  const isStoreReady = mergedData.length > 0;

  const fmtSnippetReach = isStoreReady ? retrievalVolume.toLocaleString() : "—";
  const fmtMerchantPos = isStoreReady ? modelAuthority.toFixed(2) : "—";
  const fmtMerchantCtr = isStoreReady ? (selectionEfficiency * 100).toFixed(1) + '%' : "—";
  const fmtKnowledgeNodes = isStoreReady ? knowledgeNodes.toString().padStart(2, '0') : "—";

  const totalNodes = mergedData.length || 1;
  const buoyantPct = Math.round((mergedData.filter(n => n.status === 'Optimal').length / totalNodes) * 100);
  const establishingPct = Math.round((mergedData.filter(n => ['Establishing', 'Optimizing'].includes(n.status)).length / totalNodes) * 100);
  const missingPct = Math.round((mergedData.filter(n => n.status === 'Missing').length / totalNodes) * 100);

  return (
    <div className="space-y-24 animate-fadeIn">
      {/* SECTION 1: SCORECARDS */}
      <section>
        <div className="inline-block rounded-md bg-[#FF6F61] text-white px-4 py-2 font-semibold uppercase tracking-widest text-sm mb-8 shadow-lg">
            AEO Strategic Health
        </div>

        {/* 4. SCORECARDS: White backgrounds + Dark Navy Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Selection Efficiency", val: fmtMerchantCtr, sub: "Peak AEO CTR", border: "border-[#FCD34D]" },
            { label: "Model Authority", val: fmtMerchantPos, sub: "Avg. Merchant Pos", border: "border-[#A7F3D0]" },
            { label: "Retrieval Volume", val: fmtSnippetReach, sub: "Rich Impressions", border: "border-[#7DD3FC]" },
            { label: "Knowledge Nodes", val: fmtKnowledgeNodes, sub: "Optimized Entities", border: "border-[#FCA5A5]" }
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
                  <span>{buoyantPct}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-green-400 h-full transition-all duration-1000" style={{ width: `${buoyantPct}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                  <span className="text-blue-400">Establishing</span>
                  <span>{establishingPct}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-blue-400 h-full transition-all duration-1000" style={{ width: `${establishingPct}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-tighter">
                  <span className="text-red-400">Missing (Technical Debt)</span>
                  <span>{missingPct}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full"><div className="bg-red-400 h-full transition-all duration-1000" style={{ width: `${missingPct}%` }}></div></div>
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
                  <th className="px-8 py-6 text-center">AEO Lift</th>
                  <th className="px-8 py-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-white divide-y divide-white/5">
                {VELOCITY_DEC_25.map((item, i) => (
                  <tr key={i} className="group border-b border-white/5 last:border-0 even:bg-[#2D334A]/20 hover:bg-white/5 transition-colors">
                    <td className="px-8 py-8">
                      <div className="font-bold text-sm group-hover:text-[#FCD34D] transition-colors">{item.node}</div>
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{item.url}</div>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <span className="text-[9px] font-black border border-white/10 px-3 py-1.5 rounded-lg text-white/50 uppercase tracking-tighter">{item.volume}</span>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <span className="text-[10px] font-black text-[#FF6F61] uppercase font-mono">{item.retrievalLift}%</span>
                    </td>
                    <td className="px-8 py-8 text-right">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         item.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                         (item.status === 'Establishing' || item.status === 'Optimizing') ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                         'bg-[#FF6F61]/10 text-[#FF6F61] border border-[#FF6F61]/20'
                       }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DELTA ENGINE: Retrieval Gap Analysis */}
      <DeltaRadar currentData={liveData.current} previousData={liveData.previous} />
    </div>
  );
}