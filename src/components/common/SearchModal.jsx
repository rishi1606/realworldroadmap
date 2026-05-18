import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { searchAPI } from '../../api/client';
import { FiSearch, FiX, FiFileText, FiArrowRight } from 'react-icons/fi';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ roadmaps: [], topics: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);

      // Calculate scrollbar width to prevent flickering layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      setQuery('');
      setResults({ roadmaps: [], topics: [] });
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounce Search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ roadmaps: [], topics: [] });
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await searchAPI.query(query);
        setResults(data || { roadmaps: [], topics: [] });
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  const navigateTo = (path) => {
    onClose();
    navigate(path);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-black/40 backdrop-blur-[2px] p-4 font-sans">
      {/* Click away to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-bg-surface w-full max-w-[600px] rounded-xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 border border-border-subtle flex flex-col max-h-[75vh]">

        {/* Search Input Header */}
        <div className="flex items-center px-4 border-b border-border-subtle">
          <FiSearch className="w-5 h-5 text-[#A1A1AA] mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 h-[52px] bg-transparent outline-none text-[15px] text-text-main placeholder:text-[#A1A1AA]"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1.5 rounded-md hover:bg-border-subtle text-text-muted transition-colors">
              <FiX className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block ml-2 text-[10px] bg-[#F4F4F5] border border-[#E4E4E7] px-1.5 py-0.5 rounded text-[#71717A] font-mono font-medium">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {!query && (
            <div className="p-2 pb-4 h-45">

            </div>
          )}

          {query && loading && (
            <div className="py-12 text-center text-[13px] text-[#71717A]">
              Searching...
            </div>
          )}

          {query && !loading && results.roadmaps.length === 0 && results.topics.length === 0 && (
            <div className="py-12 text-center text-[13px] text-[#71717A]">
              No results found for "{query}".
            </div>
          )}

          {query && !loading && (results.roadmaps.length > 0 || results.topics.length > 0) && (
            <div className="p-2 pb-4">

              {results.roadmaps.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-[#71717A] mt-2 mb-1">Roadmaps</div>
                  {results.roadmaps.map(roadmap => (
                    <button
                      key={roadmap._id}
                      onClick={() => navigateTo(`/roadmap/${roadmap.slug}`)}
                      className="w-full text-left flex items-center px-3 py-2.5 text-[14px] text-text-main hover:bg-[#F4F4F5] rounded-md transition-colors group"
                    >
                      <FiFileText className="w-4 h-4 mr-3 text-[#A1A1AA]" />
                      <span className="font-medium">{roadmap.title}</span>
                    </button>
                  ))}
                </>
              )}

              {results.topics.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-[#71717A] mt-4 mb-1">Topics</div>
                  {results.topics.map(topic => (
                    <button
                      key={topic._id}
                      onClick={() => navigateTo(`/roadmap/${topic.roadmapSlug}?topic=${topic.slug}`)}
                      className="w-full text-left flex items-center px-3 py-2.5 text-[14px] text-text-main hover:bg-[#F4F4F5] rounded-md transition-colors group"
                    >
                      <FiArrowRight className="w-[15px] h-[15px] mr-3 text-[#A1A1AA]" />
                      <span className="font-medium">{topic.title}</span>
                    </button>
                  ))}
                </>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E4E4E7]/50 p-2 px-4 bg-bg-surface flex items-center justify-between text-[11px] text-[#71717A]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="bg-bg-surface border border-[#E4E4E7] rounded px-1.5 py-0.5 shadow-sm font-mono flex items-center justify-center">ESC</span>
              <span>to close</span>
            </div>
          </div>

          <div>ByteByteTech Search</div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
