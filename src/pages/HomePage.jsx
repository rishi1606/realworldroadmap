import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';

export function HomePage() {
  const roadmaps = [
    {
      type: "featured",
      title: "How authentication works in Flipkart",
      description: "Learn how Flipkart securely handles logins and user sessions.",
      tags: ["System Design", "Security"],
      logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png"
    },
    {
      type: "featured",
      title: "How caching works in Netflix",
      description: "Understand the video caching strategies used globally.",
      tags: ["Architecture", "Caching"],
      logo: "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png"
    },
   
  ];

  return (
    <div className="bg-bg-base text-text-main font-sans flex-1 overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-20 pb-16 flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Developer Roadmaps
          </span>
        </h1>
        
        <p className="text-text-muted text-[17px] leading-relaxed max-w-3xl">
          <strong className="text-text-main">TechPaths</strong> is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.
        </p>
        
      </div>

      {/* Grid Section */}
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pb-32">
        
        {/* Divider Pill */}
        <div className="flex items-center justify-center relative mb-12">
          <div className="absolute w-full h-px bg-border-subtle z-0"></div>
          <span className="relative z-10 bg-bg-surface border border-border-subtle text-text-muted text-[13px] font-semibold px-4 py-1.5 rounded-full">
            Role-based Roadmaps
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          {roadmaps.map((item, index) => {
            const destUrl = `/roadmap/${encodeURIComponent(item.title)}`;
            
            if (item.type === "featured") {
              return (
                <Link 
                  key={index}
                  to={destUrl} 
                  className="bg-bg-surface border  border-border-subtle rounded-xl flex flex-col p-4 hover:border-gray-400 hover:shadow-sm transition-all group col-span-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img src={item.logo} alt={`${item.title} logo`} className="w-6 h-6 object-contain" />
                    <h3 className="font-semibold text-[18px] text-text-main group-hover:text-blue-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-text-muted text-[13px] mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 border border-gray-200 text-[11px] px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            }

            return (
              <Link 
                key={index}
                to={destUrl} 
                className="bg-bg-surface border border-border-subtle rounded flex items-center justify-between p-4 hover:border-gray-400 hover:shadow-sm transition-all group"
              >
                <span className="font-semibold text-[15px] text-text-main group-hover:text-blue-600 transition-colors">{item.title}</span>
                <FiBookmark className="text-gray-300 group-hover:text-gray-400 w-4 h-4 transition-colors" />
              </Link>
            );
          })}
          
        </div>
      </div>

    </div>
  );
}
