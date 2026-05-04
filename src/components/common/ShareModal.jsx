import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCopy, FiCheck } from 'react-icons/fi';
import { FaFacebook, FaWhatsapp, FaTelegram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export function ShareModal({ isOpen, onClose, url, title }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // Reset copied state when closing
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
      <div 
        className="fixed inset-0 z-0" 
        onClick={onClose}
      ></div>
      <div className="bg-bg-surface w-full max-w-[425px] rounded-lg shadow-lg border border-border-subtle p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-sm opacity-70 ring-offset-bg-surface transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-subtle focus:ring-offset-2"
        >
          <FiX className="w-4 h-4 text-text-muted" />
        </button>
        
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-text-main tracking-tight">Share link</h2>
          <p className="text-sm text-text-muted mt-1.5">
            Anyone who has this link will be able to view this roadmap.
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="flex flex-1 items-center bg-bg-surface rounded-md border border-border-subtle px-3 py-2">
            <input 
              type="text" 
              readOnly 
              value={url} 
              className="bg-transparent w-full outline-none text-sm text-text-muted truncate"
            />
          </div>
          <button 
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 bg-text-main text-white hover:bg-text-main/90 h-10 px-4 py-2 shrink-0 shadow whitespace-nowrap min-w-[120px]"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </button>
        </div>

        <div className="border-t border-border-subtle pt-4 mt-2">
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Share to social media</label>
          <div className="flex items-center gap-2">
            <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-md border border-border-subtle hover:bg-bg-base transition-colors text-[#1877F2]">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-md border border-border-subtle hover:bg-bg-base transition-colors text-text-main">
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-md border border-border-subtle hover:bg-bg-base transition-colors text-[#25D366]">
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a href={shareLinks.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-md border border-border-subtle hover:bg-bg-base transition-colors text-[#229ED9]">
              <FaTelegram className="w-5 h-5" />
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-md border border-border-subtle hover:bg-bg-base transition-colors text-[#0A66C2]">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
