import React from 'react';
import { FiCheck, FiMail, FiBookmark, FiBell, FiDownload, FiShare2, FiUser, FiMap, FiFolder, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function RoadmapSidebar({ roadmap, data, selectedNode, onSelectNode, selectedTopic, onSelectTopic }) {

  const TOPIC_HEIGHT = 42;
  const GAP = 10;
  const SVG_WIDTH = 40;

  return (
    <div className="w-full md:w-[50%] md:h-full md:overflow-y-auto border-b md:border-b-0 md:border-r border-border-subtle relative z-20 bg-bg-base custom-scrollbar">
      <div className="p-4 md:p-8 pb-16 flex flex-col items-start overflow-x-hidden">

        {/* Header Section */}
        <div className="w-full mb-8 text-left">

          {/* Top Actions */}
          <div className="flex items-center justify-between mb-8 w-full">
            <Link to="/" className="text-text-muted font-bold text-sm hover:text-brand transition-colors">
              ← All Roadmaps
            </Link>

            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer">
                <FiBookmark className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-[#ffc107] hover:bg-[#ffb300] text-black font-semibold text-sm px-4 py-2 rounded-md transition-colors cursor-pointer">
                <FiDownload className="w-4 h-4" />
                Download
              </button>
              <button className="flex items-center justify-center bg-[#ffc107] hover:bg-[#ffb300] text-black w-9 h-9 rounded-md transition-colors cursor-pointer">
                <FiShare2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-3 tracking-tight">
            {roadmap?.title || 'Roadmap'}
          </h1>
          <p className="text-text-muted text-[17px] mb-8 leading-relaxed font-medium">
            {roadmap?.description || 'Step by step guide to mastering this topic'}
          </p>

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-0 text-[15px] mb-4">
            <div className="flex gap-6">
              <span className="flex items-center gap-2 font-bold text-text-main border-b-2 border-text-main pb-2 cursor-pointer">
                <FiMap className="w-4 h-4" /> Roadmap
              </span>
              <span className="flex items-center gap-2 text-text-muted font-semibold pb-2 cursor-pointer hover:text-text-main transition-colors">
                <FiFolder className="w-4 h-4" /> Projects
              </span>
            </div>

            <span className="flex items-center gap-2 text-text-muted font-semibold pb-2 cursor-pointer hover:text-text-main transition-colors">
              <FiUser className="w-4 h-4" /> Personalize
            </span>
          </div>

        </div>

        {/* Branching Roadmap Graph (Alternating Spine) */}
        <div className="flex flex-col items-center relative w-full px-4 max-w-4xl mx-auto py-2">

          {/* Continuous Central Spine Line */}


          {data.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isEven = index % 2 === 0;
            const containerHeight = node.topics.length * TOPIC_HEIGHT + (node.topics.length - 1) * GAP;
            const startY = containerHeight / 2;

            return (
              <div key={node.id} className="relative flex flex-col items-center w-full my-0">

                {/* Horizontally scrolling container */}
                <div className={`flex items-center justify-center w-full overflow-x-auto custom-scrollbar py-3 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

                  {/* Main Node */}
                  <div
                    onClick={() => onSelectNode(node)}
                    className={`bg-bg-surface border-[3px] rounded-lg px-5 py-3 w-[200px] shrink-0 text-center shadow-sm relative z-10 font-bold text-[14px] cursor-pointer transition-all ${isSelected ? 'border-brand text-brand' : 'border-border-subtle text-text-main hover:border-gray-400'}`}
                  >
                    <span>{node.title}</span>
                    {isSelected && (
                      <div className={`absolute ${isEven ? '-right-3' : '-left-3'} top-1/2 -translate-y-1/2 rounded-full w-6 h-6 flex items-center justify-center bg-bg-surface text-brand z-20`}>
                        <FiCheck className="w-4 h-4" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* SVG Dotted Curves */}
                  <div className="relative shrink-0" style={{ width: SVG_WIDTH, height: containerHeight }}>
                    <svg width={SVG_WIDTH} height={containerHeight} className="absolute top-0 left-0 overflow-visible z-0">
                      {node.topics.map((_, i) => {
                        const endY = i * (TOPIC_HEIGHT + GAP) + (TOPIC_HEIGHT / 2);
                        const path = isEven
                          ? `M 0 ${startY} C ${SVG_WIDTH / 2} ${startY}, ${SVG_WIDTH / 2} ${endY}, ${SVG_WIDTH} ${endY}`
                          : `M ${SVG_WIDTH} ${startY} C ${SVG_WIDTH / 2} ${startY}, ${SVG_WIDTH / 2} ${endY}, 0 ${endY}`;
                        return <path key={i} d={path} fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
                      })}
                    </svg>
                  </div>

                  {/* Sub-Topics Stack */}
                  <div className="flex flex-col shrink-0 relative z-10" style={{ gap: GAP }}>
                    {node.topics.map((topic, i) => {
                      const isTopicSelected = selectedTopic === topic;
                      return (
                        <div
                          key={i}
                          onClick={() => { onSelectNode(node); onSelectTopic(topic); }}
                          className={`bg-bg-surface border rounded-md px-4 flex items-center w-[210px] cursor-pointer transition-all relative ${isTopicSelected ? 'border-brand shadow-sm font-bold text-brand z-20' : 'border-border-subtle font-semibold text-text-muted hover:border-gray-400 hover:text-text-main hover:shadow-sm'}`}
                          style={{ height: TOPIC_HEIGHT }}
                        >
                          <span className={`text-[12px] leading-tight w-full ${isEven ? 'pr-4 text-left' : 'pl-4 text-right'}`}>{topic}</span>
                          <div className={`absolute ${isEven ? '-right-2.5' : '-left-2.5'} top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-bg-surface z-30 ${isTopicSelected ? 'text-brand' : 'text-border-subtle'}`}>
                            <FiCheck className="w-3.5 h-3.5" strokeWidth={3} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
