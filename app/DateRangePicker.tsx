'use client';

import React from 'react';

interface DateRangePickerProps {
  start: string;
  end: string;
  onChange: (range: { start: string; end: string }) => void;
}

export default function DateRangePicker({ start, end, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
      <input 
        type="date" 
        className="text-xs font-medium text-gray-600 bg-transparent outline-none cursor-pointer"
        value={start}
        onChange={(e) => onChange({ start: e.target.value, end })}
      />
      <span className="text-gray-300">→</span>
      <input 
        type="date" 
        className="text-xs font-medium text-gray-600 bg-transparent outline-none cursor-pointer"
        value={end}
        onChange={(e) => onChange({ start, end: e.target.value })}
      />
    </div>
  );
}