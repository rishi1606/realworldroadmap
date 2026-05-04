import React from 'react';
import { FiSearch } from 'react-icons/fi';

export function SearchInput({ className = '', placeholder = "Search documentation...", ...props }) {
  return (
    <div className={`relative flex items-center w-full max-w-sm ${className}`}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        className="flex h-10 w-full rounded-md border border-border-subtle bg-bg-surface px-10 py-2 text-sm ring-offset-bg-surface file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm"
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border-subtle bg-bg-base px-1.5 font-mono text-[10px] font-medium text-text-muted opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
}
