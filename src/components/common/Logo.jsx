import React from 'react';

export function Logo({ className = "h-8" }) {
  return (
    <div className="flex items-center">
      <div className="relative overflow-hidden flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
        <img
          src="/logo.png"
          alt="realworlddev.io logo"
          className="max-w-none w-[64px] h-[64px] object-contain"
          style={{ margin: '0 -16px' }}
        />
      </div>
      <span className="text-slate-900 font-bold text-xl tracking-tighter ml-1">
        realworlddev<span className="text-blue-600">.io</span>
      </span>
    </div>
  );
}
