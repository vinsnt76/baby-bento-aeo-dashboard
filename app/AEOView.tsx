'use client';

import React, { useEffect, useState } from 'react';
import { VELOCITY_DEC_25 } from './velocity-dec-25';
import DeltaRadar from './DeltaRadar';
import { useStore } from './useStore';

interface GscDataPeriod {
  rows: any[];
  startDate: string;
  endDate: string;
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}

function ExclamationIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  border: string;
  current: number;
  previous: number;
  unit?: string;
  isReady: boolean;
}

function StatCard({ label, value, sub, border, current, previous, unit = "", isReady }: StatCardProps) {
  const delta = current - previous;
  const isUp = delta > 0;
  const isDown = delta < 0;

  return (
    <div className={`bg-[#F8F5F1] rounded-2xl p-6 shadow-sm border-4 ${border} transform transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-35`}>
      {/* Top Section: Label and Large Value */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600 mb-1">{label}</p>
        <h3 className="text-5xl font-black text-[#2D334A] tracking-tighter leading-none">{value}</h3>
      </div>
      
      {/* Footer Section: Description bottom left, Delta bottom right */}
      <div className="flex items-end justify-between mt-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 leading-none">
          {sub}
        </p>
        {isReady && (
          <div className="flex items-center gap-1">
            {isUp && <ArrowUpIcon className="w-5 h-5 text-green-500 stroke-3" />}
            {isDown && <ArrowDownIcon className="w-5 h-5 text-red-500 stroke-3" />}
            {!isUp && !isDown && <MinusIcon className="w-5 h-5 text-gray-300" />}
            
            <span className={`text-lg font-black leading-none ${isUp ? "text-green-500" : isDown ? "text-red-500" : "text-gray-400"}`}>
              {Math.abs(delta).toFixed(1)}{unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AEOView() {
  const { processGscData, selectionEfficiency, modelAuthority, retrievalVolume, knowledgeNodes, prevSelectionEfficiency, prevModelAuthority, prevRetrievalVolume, prevKnowledgeNodes, mergedData, selectedStartDate, selectedEndDate, brandedClicks, nonBrandedClicks, selectedNode, ownershipScore, semanticDensity, rankingMomentum, aiInsights, isAiLoading, aiError, generateInsights } = useStore();
  const [liveData, setLiveData] = useState<{ current: GscDataPeriod, previous: GscDataPeriod }>({ current: { rows: [], startDate: '', endDate: '' }, previous: { rows: [], startDate: '', endDate: '' } });

  useEffect(() => {
    async function fetchLive() {
      try {
        let url = '/api/gsc/performance';
        if (selectedStartDate && selectedEndDate) {
          url += `?start=${selectedStartDate}&end=${selectedEndDate}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (json.current) {
          setLiveData(json);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchLive();
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (liveData.current.rows.length > 0) {
      processGscData(liveData.current, liveData.previous, VELOCITY_DEC_25);
    }
  }, [liveData, processGscData]);

  // 🤖 AI STRATEGIST TRIGGER
  useEffect(() => {
    const timer = setTimeout(() => {
      generateInsights();
    }, 800);
    return () => clearTimeout(timer);
    
  }, [generateInsights, mergedData, selectedNode]);

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
          <StatCard
            label="Selection Efficiency"
            value={fmtMerchantCtr}
            sub="Peak AEO CTR"
            border="border-[#FCD34D]"
            current={selectionEfficiency * 100}
            previous={prevSelectionEfficiency * 100}
            unit="%"
            isReady={isStoreReady}
          />
          <StatCard
            label="Model Authority"
            value={fmtMerchantPos}
            sub="Avg. Merchant Pos"
            border="border-[#A7F3D0]"
            current={modelAuthority}
            previous={prevModelAuthority}
            isReady={isStoreReady}
          />
          <StatCard
            label="Retrieval Volume"
            value={fmtSnippetReach}
            sub="Rich Impressions"
            border="border-[#7DD3FC]"
            current={retrievalVolume}
            previous={prevRetrievalVolume}
            isReady={isStoreReady}
          />
          <StatCard
            label="Knowledge Nodes"
            value={fmtKnowledgeNodes}
            sub="Optimized Entities"
            border="border-[#FCA5A5]"
            current={knowledgeNodes}
            previous={prevKnowledgeNodes}
            isReady={isStoreReady}
          />
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
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-xs font-bold text-yellow-100 uppercase tracking-widest">Key Insights & Recommendations</h5>
              {aiInsights?.confidence && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  {Math.round(aiInsights.confidence * 100)}% Confidence
                </span>
              )}
            </div>
            
            {isAiLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-600/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-600/50 rounded w-full"></div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="h-3 bg-[#FF6F61]/20 rounded w-1/3 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600/50 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-600/50 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            ) : aiError ? (
              <div className="flex flex-col items-center justify-center p-6 text-center border border-red-500/20 bg-red-500/5 rounded-xl animate-fadeIn">
                <ExclamationIcon className="w-8 h-8 text-red-400 mb-2" />
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Analysis Unavailable</p>
                <p className="text-xs text-red-300/70 mt-1">{aiError}</p>
              </div>
            ) : aiInsights ? (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-sm text-gray-300 border-l-2 border-yellow-500/50 pl-3 italic">"{aiInsights.strategicHealth}"</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase text-[#FF6F61] mb-2">Tactical & Strategic</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm font-medium text-white">
                            <span className="text-yellow-400 mt-1">›</span>
                            <span className="text-pink-300 font-bold">Tactical:</span> {aiInsights.lowHangingFruit}
                        </li>
                        <li className="flex items-start gap-2 text-sm font-medium text-white">
                            <span className="text-yellow-400 mt-1">›</span>
                            <span className="text-slate-300 font-bold">Moonshot:</span> {aiInsights.moonshot}
                        </li>
                    </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Waiting for data signals...</p>
            )}
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
      <div className="min-h-87.5 min-w-0">
        <DeltaRadar currentData={liveData.current.rows} />
      </div>
    </div>
  );
}