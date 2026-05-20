import React from 'react';
import { Link } from 'react-router-dom';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <svg key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-3.5 h-3.5 fill-slate-200 text-slate-200" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  return stars;
};

export function RoadmapCard({ item }) {
  const destUrl = `/roadmap/${encodeURIComponent(item.slug || item.title)}`;
  const topicCount = item.nodes?.filter(n => (n.level || n._level || 'freshers') === 'freshers').reduce((acc, node) => acc + (node.topics?.length || 0), 0) || 0;

  const fallbackDesc = item.slug?.includes('flipkart')
    ? "Understand exactly how Flipkart securely handles authentication, session management, and JWTs at scale."
    : "A comprehensive, step-by-step technical guide to understanding this architecture.";

  const logo = item.image || item.logo || "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png";

  return (
    <Link
      to={destUrl}
      className="rounded-xl border border-border-subtle bg-bg-surface text-gray-950 shadow-sm hover:shadow-md transition-all group col-span-1 flex flex-col h-full"
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-full border border-[#d4d4d8] bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <img src={logo} alt={`${item.title} logo`} className="w-5 h-5 object-contain" />
          </div>
          <div>
            <h3 className="font-semibold leading-tight tracking-tight text-[18px] group-hover:text-blue-600 text-text-main transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-1 mt-1.5">
              {/* <div className="flex items-center">
                {renderStars(item.averageRating || 0)}
              </div>
              <span className="text-xs font-semibold text-slate-500 ml-1">
                {item.averageRating ? item.averageRating.toFixed(1) : "0.0"} ({item.totalRatings || 0})
              </span> */}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex-1">
        <p className="text-sm text-[#71717A] leading-relaxed line-clamp-3">
          {item.description || fallbackDesc}
        </p>
      </div>

      <div className="flex items-center justify-between p-6 pt-0 mt-auto border-t border-border-subtle pt-4">
        <div className="flex gap-2 flex-wrap">
          {item.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold transition-colors text-text-main bg-gray-50/50">
              {tag}
            </span>
          ))}
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
