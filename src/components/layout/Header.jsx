import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiChevronDown, FiZap } from 'react-icons/fi';

export function Header() {
  return (
    <header className="w-full bg-bg-surface py-3 border-b border-border-subtle z-50 sticky top-0">
      <div className="max-w-[1600px]  mx-auto px-4 md:px-8 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center justify-center w-8 h-8 bg-text-main rounded text-bg-surface font-black text-xl leading-none">
              r.
            </Link>
          </div>
          
          {/* Links */}
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-semibold text-text-muted">
            <Link to="/" className="hover:text-text-main transition-colors flex items-center gap-1 cursor-pointer">
              Roadmaps <FiChevronDown className="w-4 h-4" />
            </Link>
            <a href="#" className="text-yellow-600 hover:text-yellow-700 transition-colors flex items-center gap-1">
              <FiZap className="w-4 h-4" fill="currentColor" /> Upgrade to Pro
            </a>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5 font-semibold text-[15px]">
          <Link to="/login" className="text-text-muted hover:text-text-main transition-colors hidden sm:block cursor-pointer">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}
