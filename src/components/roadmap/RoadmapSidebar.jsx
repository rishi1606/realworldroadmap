import React, { useState, useEffect } from 'react';
import { FiCheck, FiMail, FiBookmark, FiBell, FiDownload, FiShare2, FiUser, FiMap, FiFolder, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookmarkAPI } from '../../api/client';
import toast from 'react-hot-toast';

import { RatingBadge } from '../common/RatingBadge';
import { ShareModal } from '../common/ShareModal';
import { Button } from '../common/Button';

export function RoadmapSidebar({ roadmap, data, selectedNode, onSelectNode, selectedTopic, onSelectTopic, progress = {} }) {
  const { user, requireAuth } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      if (user && roadmap?._id) {
        try {
          const { data } = await bookmarkAPI.getBookmarks();
          setIsBookmarked(data.some(b => b._id === roadmap._id || b === roadmap._id));
        } catch (err) {
          console.error('Error checking bookmark status', err);
        }
      }
    };
    checkBookmark();
  }, [roadmap, user]);

  const handleBookmarkToggle = async () => {
    if (!requireAuth()) return;

    try {
      const { data } = await bookmarkAPI.toggleBookmark(roadmap._id);
      setIsBookmarked(data.isBookmarked);
      if (data.isBookmarked) {
        toast.success('Bookmark added successfully');
      } else {
        toast.success('Bookmark removed');
      }
    } catch (err) {
      toast.error('Failed to update bookmark');
    }
  };

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
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmarkToggle}
                className={`transition-colors cursor-pointer !shadow-none ${isBookmarked ? 'text-brand border-brand/20 bg-brand/5' : 'text-text-muted'}`}
              >
                <FiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsShareOpen(true)}
                className="text-text-muted cursor-pointer !shadow-none"
              >
                <FiShare2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main mb-3 tracking-tight">
            {roadmap?.title || 'Roadmap'}
          </h1>
          <p className="text-text-muted text-[17px] mb-4 leading-relaxed font-medium">
            {roadmap?.description || 'Step by step guide to mastering this topic'}
          </p>

          <RatingBadge roadmapId={roadmap?._id} />

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
          </div>

        </div>

        {/* Branching Roadmap Graph (Alternating Spine) */}
        <div className="flex flex-col items-center relative w-full px-4 max-w-4xl mx-auto py-2">

          {/* Continuous Central Spine Line */}


          {data.map((node, index) => {
            const isSelected = selectedNode?._id === node._id;
            const isEven = index % 2 === 0;
            const containerHeight = node.topics.length * TOPIC_HEIGHT + (node.topics.length - 1) * GAP;
            const startY = containerHeight / 2;

            const hasTopics = node.topics.length > 0;
            const firstStatus = hasTopics ? (user ? (progress[node.topics[0]._id] || 'pending') : 'none') : null;
            const allSame = hasTopics && node.topics.every(t => (user ? (progress[t._id] || 'pending') : 'none') === firstStatus);
            const allDone = allSame && firstStatus === 'done';

            let nodeBaseStyle = 'border-border-subtle text-text-main hover:border-gray-400 bg-bg-surface';
            if (allSame) {
              if (firstStatus === 'done') nodeBaseStyle = 'border-green-500 text-green-700 bg-green-50';
              else if (firstStatus === 'in-progress') nodeBaseStyle = 'border-blue-400 text-blue-700 bg-blue-50';
              else if (firstStatus === 'skip') nodeBaseStyle = 'border-border-subtle text-text-muted bg-bg-base';
              else if (firstStatus === 'pending') nodeBaseStyle = 'border-yellow-400 text-yellow-700 bg-yellow-50';
            }

            let nodeStyles = nodeBaseStyle;
            if (isSelected) {
              nodeStyles += ' shadow-md ring-2 ring-opacity-40 z-20';
              if (allSame) {
                if (firstStatus === 'done') nodeStyles += ' ring-green-400';
                else if (firstStatus === 'in-progress') nodeStyles += ' ring-blue-400';
                else if (firstStatus === 'skip') nodeStyles += ' ring-border-subtle';
                else if (firstStatus === 'pending') nodeStyles += ' ring-yellow-400';
                else nodeStyles += ' border-brand text-brand ring-brand/20 bg-bg-surface';
              } else {
                nodeStyles += ' border-gray-800 text-text-main bg-bg-base ring-gray-200';
              }
            }

            return (
              <div key={node._id || index} className="relative flex flex-col items-center w-full my-0">

                {/* Horizontally scrolling container */}
                <div className={`flex items-center justify-center w-full overflow-x-auto custom-scrollbar py-3 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

                  {/* Main Node */}
                  <div
                    onClick={() => onSelectNode(node)}
                    className={`bg-bg-surface border-2 rounded-lg px-5 py-3 w-[200px] shrink-0 text-center shadow-sm relative font-bold text-[14px] cursor-pointer transition-all ${nodeStyles}`}
                  >
                    <span>{node.title}</span>
                    {allDone && (
                      <div className={`absolute ${isEven ? '-right-3' : '-left-3'} top-1/2 -translate-y-1/2 rounded-full w-6 h-6 flex items-center justify-center bg-bg-surface text-green-600 z-20`}>
                        <FiCheck className="w-4 h-4" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* SVG Dotted Curves */}
                  <div className="relative shrink-0" style={{ width: SVG_WIDTH, height: containerHeight }}>
                    <svg width={SVG_WIDTH} height={containerHeight} className="absolute top-0 left-0 overflow-visible z-0">
                      {node.topics.map((topic, i) => {
                        const endY = i * (TOPIC_HEIGHT + GAP) + (TOPIC_HEIGHT / 2);
                        const path = isEven
                          ? `M 0 ${startY} C ${SVG_WIDTH / 2} ${startY}, ${SVG_WIDTH / 2} ${endY}, ${SVG_WIDTH} ${endY}`
                          : `M ${SVG_WIDTH} ${startY} C ${SVG_WIDTH / 2} ${startY}, ${SVG_WIDTH / 2} ${endY}, 0 ${endY}`;

                        const tStat = user ? (progress[topic._id] || 'pending') : 'none';
                        let strokeColor = '#cbd5e1'; // gray-300 (none)
                        if (tStat === 'pending') strokeColor = '#facc15'; // yellow-400
                        else if (tStat === 'done') strokeColor = '#22c55e'; // green-500
                        else if (tStat === 'in-progress') strokeColor = '#60a5fa'; // blue-400
                        else if (tStat === 'skip') strokeColor = '#d1d5db'; // gray-300

                        return <path key={i} d={path} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="4 4" />
                      })}
                    </svg>
                  </div>

                  {/* Sub-Topics Stack */}
                  <div className="flex flex-col shrink-0 relative z-10" style={{ gap: GAP }}>
                    {node.topics.map((topic, i) => {
                      const isTopicSelected = selectedTopic?._id === topic._id;
                      const status = user ? (progress[topic._id] || 'pending') : 'none';

                      let baseStyle = '';
                      let iconColorClass = '';

                      if (status === 'done') {
                        baseStyle = 'border-green-500 text-green-700 bg-green-50';
                        iconColorClass = 'text-green-600';
                      } else if (status === 'in-progress') {
                        baseStyle = 'border-blue-400 text-blue-700 bg-blue-50';
                        iconColorClass = 'text-blue-500';
                      } else if (status === 'skip') {
                        baseStyle = 'border-border-subtle text-text-muted bg-bg-base';
                        iconColorClass = 'text-text-muted';
                      } else if (status === 'pending') {
                        baseStyle = 'border-yellow-300 text-yellow-700 bg-yellow-50';
                        iconColorClass = 'text-yellow-500';
                      } else {
                        baseStyle = 'border-border-subtle text-text-main bg-bg-surface';
                        iconColorClass = 'text-border-subtle';
                      }

                      let topicStyles = baseStyle;
                      if (isTopicSelected) {
                        topicStyles += ' shadow-md font-bold z-20';
                        if (status === 'done') topicStyles += ' bg-green-100 border-green-600';
                        else if (status === 'in-progress') topicStyles += ' bg-blue-100 border-blue-500';
                        else if (status === 'skip') topicStyles += ' bg-border-subtle border-gray-400';
                        else if (status === 'pending') topicStyles += ' bg-yellow-100 border-yellow-400';
                        else topicStyles += ' bg-bg-surface border-brand text-brand ring-2 ring-brand/20';
                      } else {
                        topicStyles += ' font-semibold hover:shadow-sm z-10 hover:border-gray-400';
                      }

                      return (
                        <div
                          key={i}
                          onClick={() => { onSelectNode(node); onSelectTopic(topic); }}
                          className={`border rounded-md px-4 flex items-center w-[210px] cursor-pointer transition-all relative ${topicStyles}`}
                          style={{ height: TOPIC_HEIGHT }}
                        >
                          <span className={`text-[12px] leading-tight w-full ${isEven ? 'pr-4 text-left' : 'pl-4 text-right'}`}>{topic.title}</span>
                          <div className={`absolute ${isEven ? '-right-2.5' : '-left-2.5'} top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-bg-surface z-30 ${iconColorClass}`}>
                            {status === 'done' ? (
                              <FiCheck className="w-3.5 h-3.5" strokeWidth={3} />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            )}
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
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={window.location.href}
        title={roadmap?.title || 'Roadmap'}
      />
    </div>
  );
}
