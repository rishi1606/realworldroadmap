import React from 'react';

export function Logo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* <img src="/logo.png" alt="realworlddev.io logo" className="h-8 w-8 object-contain rounded-md" /> */}
      <span className="text-slate-900 font-bold text-xl tracking-tighter">
        realworlddev<span className="text-blue-600">.io</span>
      </span>
    </div>
  );
}
