import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLayers } from 'react-icons/fi';
import { roadmapAPI } from '../api/client';
import { SkeletonLoader } from '../components/common/SkeletonLoader';

import { RoadmapCard } from '../components/common/RoadmapCard';

export function HomePage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await roadmapAPI.getAll();

        // Add logos locally for UI aesthetics since they aren't in DB right now
        const enhancedData = data.map(rm => ({
          ...rm,
          type: "featured",
        }));

        setRoadmaps(enhancedData);
      } catch (error) {
        console.error("Failed to fetch roadmaps", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <div className="bg-bg-base text-text-main font-sans flex-1 overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-bg-surface border-b border-border-subtle">
        {/* Vector Background Grid & Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-500 opacity-[0.15] blur-[100px]"></div>
        <div className="absolute right-0 top-20 -z-10 h-[250px] w-[250px] rounded-full bg-blue-500 opacity-[0.1] blur-[100px]"></div>

        <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-28 pb-20 flex flex-col items-center text-center relative z-10">

          <div className="inline-flex items-center rounded-full border border-border-subtle bg-white/50 px-3 py-1 text-sm text-text-main backdrop-blur-sm mb-8 hover:bg-bg-surface transition-colors cursor-pointer shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Introducing Role-based Roadmaps
            <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900 leading-[1.1]">
            Developer Roadmaps
          </h1>

          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
            <span className="text-slate-900 font-semibold">TechPaths</span> is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
          </p>

        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-32">

        {/* Divider Pill */}
        <div className="flex items-center justify-center relative mb-12">
          <div className="absolute w-full h-px bg-border-subtle z-0"></div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {loading ? (
            <>
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
            </>
          ) : roadmaps.map((item, index) => {
            if (item.type === "featured") {
              return <RoadmapCard key={index} item={item} />;
            }

            const destUrl = `/roadmap/${encodeURIComponent(item.slug || item.title)}`;

            return (
              <Link
                key={index}
                to={destUrl}
                className="bg-bg-surface border border-border-subtle rounded flex items-center justify-between p-4 hover:border-gray-400 hover:shadow-sm transition-all group"
              >
                <span className="font-semibold text-[15px] text-text-main group-hover:text-blue-600 transition-colors">{item.title}</span>
              </Link>
            );
          })}

        </div>
      </div>

    </div>
  );
}
