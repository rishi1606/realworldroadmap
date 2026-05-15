import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { LoginModal } from '../common/LoginModal';

export function Layout({ children }) {
  const location = useLocation();
  const isRoadmapPage = location.pathname.startsWith('/roadmap');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const hideFooter = isRoadmapPage || isAuthPage;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <LoginModal />
    </div>
  );
}
