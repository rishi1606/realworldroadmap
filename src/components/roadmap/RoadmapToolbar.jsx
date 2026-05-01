import React from 'react';
import { FiLayers, FiZap, FiChevronDown, FiX } from 'react-icons/fi';

export function RoadmapToolbar() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border-subtle">
      <div className="flex gap-2">
        <button className="flex items-center gap-2 bg-text-main text-bg-surface px-3 py-1.5 rounded text-sm font-semibold hover:opacity-90 transition-opacity">
          <FiLayers className="w-4 h-4" />
          Resources
        </button>
        <button className="flex items-center gap-2 bg-bg-surface border border-border-subtle text-text-muted px-3 py-1.5 rounded text-sm font-semibold hover:bg-bg-base transition-colors">
          <FiZap className="w-4 h-4 text-text-muted" />
          AI Tutor
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center rounded border border-border-subtle hover:bg-bg-base text-text-muted transition-colors">
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
