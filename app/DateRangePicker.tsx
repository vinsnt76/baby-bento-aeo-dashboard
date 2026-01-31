'use client';

import React from 'react';

interface DateRangePickerProps {
  start: string;
  end: string;
  onChange: (range: { start: string; end: string }) => void;
  variant?: 'dark' | 'light';
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
    </svg>
  );
}

export default function DateRangePicker({ start, end, onChange, variant = 'dark' }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black transition-colors p-2 rounded-xl shadow-md border border-white/10">
      <CalendarIcon className="w-4 h-4 text-[#FDDF5B]" />
      <input 
        type="date" 
        className="text-xs font-medium text-white bg-transparent outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
        value={start}
        onChange={(e) => onChange({ start: e.target.value, end })}
      />
      <span className="text-white/20">→</span>
      <input 
        type="date" 
        className="text-xs font-medium text-white bg-transparent outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert"
        value={end}
        onChange={(e) => onChange({ start, end: e.target.value })}
      />
    </div>
  );
}