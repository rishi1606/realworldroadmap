import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSearch, FiMoon } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { SearchModal } from '../common/SearchModal';

export function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xs border-border-subtle z-50 sticky top-0 h-14 flex items-center">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4 pt-1">
          {/* <Link to="/" className="flex items-center gap-2 text-text-main">
            <Logo className="h-28 w-auto" />
          </Link> */}

          <nav className="hidden md:flex items-center gap-[18px] text-[14px] font-medium text-[#71717A]">
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center w-[260px] bg-[#F4F4F5] hover:bg-[#E4E4E7]/80 border border-transparent text-[#71717A] text-sm px-3 py-1.5 rounded-md cursor-pointer transition-colors relative mr-2"
          >
            <FiSearch className="w-4 h-4 mr-2 text-[#A1A1AA]" />
            <span className="text-[13px] font-normal">Search documentation...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border border-[#E4E4E7] bg-bg-surface px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          <div className="flex items-center gap-1 border-l border-border-subtle pl-3">

            {/* Theme Toggle placeholder */}
            {!user ? (
              <Link to="/login" className="bg-text-main text-[#FAFAFA] hover:bg-text-main/90 transition-colors text-[13px] font-medium h-8 px-4 rounded-md inline-flex items-center justify-center">
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200/50 outline-none hover:ring-2 hover:ring-gray-200 hover:ring-offset-2 transition-all focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 bg-border-subtle"
                >
                  <div className="flex h-full w-full items-center justify-center bg-[#F4F4F5] text-[13px] text-text-main font-medium uppercase">
                    {user.picture && !user.picture.includes('ui-avatars') && !imgError ? (
                      <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="h-full w-full object-cover" 
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      user.name?.charAt(0) || 'U'
                    )}
                  </div>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-bg-surface rounded-md shadow-md border border-border-subtle py-1 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-2 py-1.5  border-border-subtle mb-1">
                        <p className="text-sm font-medium text-text-main truncate px-1">{user.name}</p>
                        <p className="text-xs text-text-muted truncate px-1">{user.email}</p>
                      </div>
                      {/* <div className="px-1">
                        <button className="w-full text-left px-2 py-1.5 text-sm text-text-muted hover:bg-border-subtle hover:text-text-main rounded-sm flex items-center transition-colors">
                          Profile
                        </button>
                        <button className="w-full text-left px-2 py-1.5 text-sm text-text-muted hover:bg-border-subtle hover:text-text-main rounded-sm flex items-center transition-colors">
                          Settings
                        </button>
                      </div> */}
                      <div className="border-t border-border-subtle mt-1 px-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm flex items-center transition-colors"
                        >
                          <FiLogOut className="w-4 h-4 mr-2" /> Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
