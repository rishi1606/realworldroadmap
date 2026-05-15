import React from 'react';

export function Logo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
        <span className="text-white font-bold text-lg italic">T</span>
      </div>
      <span className="text-slate-900 font-bold text-xl tracking-tighter">
        Tech<span className="text-blue-600">Paths</span>
      </span>
    </div>
  );
}
