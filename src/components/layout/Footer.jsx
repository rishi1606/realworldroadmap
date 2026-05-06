import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-6 md:py-0 w-full mt-auto relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2 text-center text-sm leading-loose text-[#71717A] md:text-left">
          <Logo className="h-4 w-4" />
          <p>
            Built by{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-text-main underline-offset-4 hover:underline"
            >
              TechPaths
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-text-main underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium text-[#71717A]">
          <Link to="/terms" className="hover:text-text-main transition-colors">Terms</Link>
          <Link to="/privacy-policy" className="hover:text-text-main transition-colors">Privacy</Link>
          <Link to="/contact" className="hover:text-text-main transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
