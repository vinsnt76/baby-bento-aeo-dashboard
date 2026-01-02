'use client';

import React from 'react';

export default function DownloadButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="px-6 py-3 bg-[#FF6F61] text-white rounded-xl text-xs font-black shadow-xl uppercase tracking-widest transform hover:scale-105 transition-transform print:hidden"
    >
      Download PDF
    </button>
  );
}