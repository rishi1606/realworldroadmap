import React, { useState, useEffect } from 'react';
import { bookmarkAPI } from '../api/client';
import { RoadmapCard } from '../components/common/RoadmapCard';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';

export function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, requireAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!requireAuth()) {
      navigate('/');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const { data } = await bookmarkAPI.getBookmarks();

        // Add logos locally for UI aesthetics to match Homepage
        const enhancedData = data.map(rm => ({
          ...rm,
          type: "featured",
          tags: rm.tags?.length ? rm.tags : ["System Design", "Architecture"],
          logo: rm.logo || (rm.slug?.includes('flipkart')
            ? "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png"
            : "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png")
        }));

        setBookmarks(enhancedData);
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, navigate]);

  return (
    <div className="bg-bg-base text-text-main font-sans flex-1 overflow-x-hidden min-h-[calc(100vh-65px)]">

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-bg-surface border-b border-border-subtle">
        {/* Different Vector Background (Radial Dots & Indigo/Emerald Orbs) */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-emerald-500 opacity-[0.1] blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-indigo-500 opacity-[0.1] blur-[100px]"></div>

        <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-20 pb-16 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
              <FiBookmark className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-text-main tracking-tight">Your Bookmarks</h1>
          </div>
          <p className="text-text-muted text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Quickly jump back into the roadmaps you've saved. Your personalized path to mastering complex systems.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
            </>
          ) : bookmarks.length > 0 ? (
            bookmarks.map((roadmap, index) => (
              <RoadmapCard key={index} item={roadmap} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-border-subtle rounded-2xl bg-gray-50/50 shadow-sm">
              <div className="w-16 h-16 mx-auto bg-bg-surface border border-border-subtle rounded-xl flex items-center justify-center mb-4 shadow-sm text-text-muted">
                <FiBookmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">No bookmarks yet</h3>
              <p className="text-text-muted max-w-sm mx-auto font-medium">Start exploring roadmaps and click the bookmark icon to save them here for easy access later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
