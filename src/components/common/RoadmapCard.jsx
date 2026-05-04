import React from 'react';
import { Link } from 'react-router-dom';
import { RatingBadge } from './RatingBadge';

export function RoadmapCard({ item }) {
  const destUrl = `/roadmap/${encodeURIComponent(item.slug || item.title)}`;
  const topicCount = item.nodes?.reduce((acc, node) => acc + (node.topics?.length || 0), 0) || 0;
  
  const fallbackDesc = item.slug?.includes('flipkart') 
    ? "Understand exactly how Flipkart securely handles authentication, session management, and JWTs at scale."
    : "A comprehensive, step-by-step technical guide to understanding this architecture.";
  
  const logo = item.logo || (item.slug?.includes('flipkart') 
    ? "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png" 
    : "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png");

  return (
    <Link 
      to={destUrl} 
      className="rounded-xl border border-border-subtle bg-bg-surface text-gray-950 shadow-sm hover:shadow-md transition-all group col-span-1 flex flex-col h-full"
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
           <img src={logo} alt={`${item.title} logo`} className="w-8 h-8 object-contain shrink-0" />
           <h3 className="font-semibold leading-none tracking-tight text-[18px] group-hover:text-blue-600 text-text-main transition-colors">
             {item.title}
           </h3>
        </div>
        <div className="flex items-center mt-1 pt-1">
          <RatingBadge roadmapId={item._id} className="!p-0" readonly={true} />
        </div>
      </div>
      
      <div className="p-6 pt-0 flex-1">
        <p className="text-sm text-[#71717A] leading-relaxed line-clamp-3">
          {item.description || fallbackDesc}
        </p>
      </div>
      
      <div className="flex items-center justify-between p-6 pt-0 mt-auto border-t border-border-subtle pt-4">
        <div className="flex gap-2">
          {item.tags?.slice(0,2).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 text-text-main bg-gray-50/50">
              {tag}
            </span>
          ))}
          {(!item.tags || item.tags.length === 0) && (
            <>
              <span className="inline-flex items-center rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-gray-50/50">
                System Design
              </span>
              <span className="inline-flex items-center rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-gray-50/50">
                Architecture
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[#71717A] text-[12px] font-semibold">
          <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {topicCount > 0 ? topicCount : (item.slug?.includes('flipkart') ? 14 : 67)} topics
        </div>
      </div>
    </Link>
  );
}
