'use client';

import React from 'react';
import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { BASELINE_DEC_25 } from './baseline-dec-25';
import AEOView from './AEOView';
import ClassicSEOView from './ClassicSEOView';
import { useState } from 'react';

export default function BabyBentoDashboard() {
  const [activeTab, setActiveTab] = useState<'aeo' | 'classic'>('aeo');
  const lastUpdated = BASELINE_DEC_25.snapshotMonth;

  return (
    /* 1. GLOBAL BACKGROUND: Multi-point Radial Mesh Gradient */
    <div className="min-h-screen bg-[radial-gradient(at_top_left,#2A1A5E_0%,transparent_50%),radial-gradient(at_bottom_right,#0F4C75_0%,transparent_50%),radial-gradient(at_center,#3A2F8F_10%,transparent_80%)] bg-fixed font-sans text-[#2D334A] pb-20" style={{ backgroundColor: '#2A1A5E' }}>
      
      <main className="max-w-7xl mx-auto p-4 sm:p-8 pb-24 sm:pb-8 space-y-24 animate-fadeIn">
        
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
              <p className="text-sm tracking-wide text-[#6B7280] mt-1">{lastUpdated.toUpperCase()} BASELINE PERFORMANCE</p>
              <p className="text-xs font-bold tracking-widest text-[#FF6F61] mt-1">AEO INTELLIGENCE REPORT</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DownloadButton />
            <div className="flex bg-zinc-900 p-1 rounded-lg border border-white/5">
              <button 
                onClick={() => setActiveTab('aeo')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'aeo' ? 'bg-[#FDDF5B] text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
              >
                AEO Intelligence
              </button>
              <button 
                onClick={() => setActiveTab('classic')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'classic' ? 'bg-[#FDDF5B] text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
              >
                Classic SEO
              </button>
            </div>
          </div>
        </header>

        {/* 🚀 Dynamic Content Area */}
        {activeTab === 'aeo' ? <AEOView /> : <ClassicSEOView />}

      </main>
    </div>
  );
}