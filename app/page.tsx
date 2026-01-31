'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { BASELINE_DEC_25 } from './baseline-dec-25';
import AEOView from './AEOView';
import ClassicSEOView from './ClassicSEOView';
import { useStore } from './useStore';
import DateRangePicker from './DateRangePicker';

export default function BabyBentoDashboard() {
  const [activeTab, setActiveTab] = useState<'aeo' | 'classic'>('aeo');
  const { setSelectedNode, selectedStartDate, selectedEndDate, setReportPeriod } = useStore();
  const lastUpdated = BASELINE_DEC_25.snapshotMonth;

  return (
    <div className="min-h-screen bg-[#2A1A5E] bg-fixed font-sans text-[#2D334A] pb-20" 
         style={{ backgroundImage: 'radial-gradient(at top left,#2A1A5E 0%,transparent 50%), radial-gradient(at bottom right,#0F4C75 0%,transparent 50%)' }}>
      
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-12 animate-fadeIn">
        
        {/* CORRECTED HEADER: Title + Global Date Picker + Reset/Download */}
        <header className="bg-[#F8F5F1] text-[#2D334A] p-8 shadow-lg rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 shrink-0">
               <Image 
                src="/baby-bento-logo.svg"
                alt="Baby Bento Logo" 
                fill
                className="object-contain drop-shadow-md"
                priority
               />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#2D334A]">
                Baby Bento Dashboard
              </h1>
              <p className="text-xs font-bold tracking-widest text-[#FF6F61] mt-1 uppercase">AEO Intelligence Engine</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* 1. RESET VIEW: The "Clean Slate" action starts the row */}
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF6F61] transition-colors"
            >
              Reset View
            </button>

            {/* 2. DOWNLOAD PDF: Positioned in the middle as the primary export action */}
            <DownloadButton />

            <div className="h-8 w-px bg-gray-200 hidden md:block mx-2" />

            {/* 3. DATE PICKER: The far-right anchor point, styled as the "Dark Mode" variant */}
            <div className="relative">
              <DateRangePicker 
                start={selectedStartDate}
                end={selectedEndDate}
                onChange={(range) => {
                  if (range?.start && range?.end) setReportPeriod(range.start, range.end);
                }}
              />
            </div>
          </div>
        </header>

        {/* 2. SUB-HEADER AREA: Handled inside the views (AEOView / ClassicSEOView) */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-1">
            <div className="flex items-center justify-center p-2 gap-2">
                <button 
                    onClick={() => setActiveTab('aeo')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'aeo' ? 'bg-[#FDDF5B] text-black shadow-xl scale-[1.02]' : 'text-white/50 hover:text-white'}`}
                >
                    AEO Intelligence
                </button>
                <button 
                    onClick={() => setActiveTab('classic')}
                    className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'classic' ? 'bg-[#FDDF5B] text-black shadow-xl scale-[1.02]' : 'text-white/50 hover:text-white'}`}
                >
                    Classic SEO
                </button>
            </div>
        </div>

        {/* 🚀 Dynamic Content Area */}
        <section className="mt-12">
            {activeTab === 'aeo' ? <AEOView /> : <ClassicSEOView />}
        </section>

      </main>
    </div>
  );
}