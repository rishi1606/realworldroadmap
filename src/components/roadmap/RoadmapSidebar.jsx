import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiShare2, FiMap, FiFolder, FiZap, FiLock, FiSettings, FiLayers, FiLink, FiCode, FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ShareModal } from '../common/ShareModal';

const NODE_ICONS = [FiSettings, FiLayers, FiZap, FiLink, FiCode, FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox];

// ─── Main Sidebar ──────────────────────────────────────────────────────────────
export function RoadmapSidebar({ roadmap, data, selectedNode, onSelectNode, selectedTopic, onSelectTopic }) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState('all');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    setShareUrl(window.location.href);
    return () => clearTimeout(timer);
  }, []);

  const nodesWithLevels = useMemo(() =>
    (data || []).map(n => ({ ...n, _level: n.level || 'freshers' })), [data]);

  const fresherNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'freshers'), [nodesWithLevels]);
  const intermNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'intermediate'), [nodesWithLevels]);
  const expNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'experienced'), [nodesWithLevels]);
  const comingSoonCount = intermNodes.length + expNodes.length;

  const showFreshers = activeLevel === 'all' || activeLevel === 'freshers';
  const showComingSoon = activeLevel === 'all' || activeLevel === 'comingSoon';

  const handleNotifyClick = () => {
    if (!requireAuth()) return;
    setShowNotify(true);
  };

  const renderLevel = (levelKey, nodes) => {
    if (!nodes || nodes.length === 0) return null;
    const isInter = levelKey === 'intermediate';
    const levelNum = isInter ? 2 : 3;
    const theme = isInter
      ? { bg: 'bg-blue-50/80', iconBg: 'bg-blue-100', icon: 'text-blue-600', title: 'text-blue-900', dot: 'bg-blue-400', bullet: 'text-slate-700' }
      : { bg: 'bg-purple-50/80', iconBg: 'bg-purple-100', icon: 'text-purple-600', title: 'text-purple-900', dot: 'bg-purple-400', bullet: 'text-slate-700' };

    const cardTitle = nodes.length === 1 ? `Level ${levelNum}: ${nodes[0].title}` : `Level ${levelNum}: Coming Soon`;

    return (
      <div className={`w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col mb-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${theme.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
              <FiZap className={`w-4 h-4 ${theme.icon}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[14px] font-extrabold ${theme.title} tracking-tight`}>{cardTitle}</span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Upcoming</span>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center shrink-0`}>
            <FiLock className={`w-4 h-4 ${theme.icon}`} />
          </div>
        </div>

        <div className={`${theme.bg} rounded-lg p-4`}>
          <ul className="flex flex-col gap-2.5">
            {nodes.map((n, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0 mt-[7px] shadow-sm`} />
                <span className={`text-[13px] font-semibold ${theme.bullet} leading-snug`}>{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-[40%] md:h-full md:overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 relative z-20 bg-white custom-scrollbar">
      <div className="p-6 md:p-8 pb-16 flex flex-col items-start">

        {/* ── Top actions */}
        <div className="flex items-center justify-between mb-6 w-full">
          <Link to="/" className="text-slate-500 font-semibold text-[13px] hover:text-blue-600 transition-colors">
            ← All Roadmaps
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareOpen(true)}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Title */}
        <h1 className="text-[28px] md:text-[32px] font-extrabold text-slate-900 mb-2 tracking-tight leading-[1.15]">
          {roadmap?.title || 'Roadmap'}
        </h1>
        <p className="text-slate-500 text-[14px] mb-4 leading-relaxed font-medium">
          {roadmap?.description || 'Step by step guide to mastering this topic'}
        </p>

        {/* ── Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 w-full mt-5 mb-5">
          <div className="flex gap-6 text-[14px]">
            <span className="flex items-center gap-2 font-bold text-slate-900 border-b-2 border-slate-900 pb-2 cursor-pointer">
              <FiMap className="w-4 h-4" /> Roadmap
            </span>
            <span className="flex items-center gap-2 text-slate-500 font-semibold pb-2 cursor-pointer hover:text-slate-900 transition-colors">
              <FiFolder className="w-4 h-4" /> Projects
            </span>
          </div>
        </div>

        {/* ── Filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-5 w-full">
          {[
            { key: 'all', label: 'All', count: nodesWithLevels.length, dot: 'bg-blue-500' },
            { key: 'freshers', label: 'Freshers', count: fresherNodes.length, dot: 'bg-emerald-500' },
            { key: 'comingSoon', label: 'Coming Soon', count: comingSoonCount, dot: 'bg-slate-400', locked: true },
          ].map(chip => {
            const active = activeLevel === chip.key;
            return (
              <button key={chip.key}
                onClick={() => setActiveLevel(chip.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all cursor-pointer ${active ? 'border-slate-300 bg-white text-slate-900 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-500 hover:text-slate-900'
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                {chip.label}
                {chip.locked && <FiLock className="w-2.5 h-2.5 opacity-50" />}
                <span className="opacity-60">({chip.count})</span>
              </button>
            );
          })}
        </div>

        {/* ── Roadmap Content */}
        <div className="w-full relative mt-6">
          <div className="flex flex-col gap-0 w-full relative">

            {showFreshers && (
              <div className="relative">
                {fresherNodes.map((node, index) => {
                  const isSelected = selectedNode?._id === node._id;
                  const isLast = index === fresherNodes.length - 1;

                  return (
                    <div key={node._id} className="relative z-10 flex w-full">
                      <div className="flex flex-col items-center shrink-0 w-8 mr-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-black z-10 shadow-sm bg-slate-200 text-slate-700`}>
                          {index + 1}
                        </div>

                        {!isLast && <div className="flex-1 w-[2px] bg-slate-200 my-1" />}
                        {isLast && showComingSoon && <div className="h-10 w-[2px] bg-gradient-to-b from-slate-200 to-transparent my-1" />}
                      </div>

                      <div className={`flex-1 rounded-xl border transition-all overflow-hidden bg-white mb-6 ${isSelected ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}>
                        <div
                          onClick={() => { onSelectNode(node); onSelectTopic(node.topics?.[0] || null); }}
                          className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            {React.createElement(NODE_ICONS[index % NODE_ICONS.length], { className: "w-4 h-4 text-slate-600" })}
                          </div>
                          <span className={`flex-1 text-[14px] font-bold tracking-tight ${isSelected ? 'text-blue-600' : 'text-slate-800'}`}>
                            {node.title}
                          </span>
                        </div>

                        <div className="border-t border-slate-100 px-2 py-2 flex flex-col gap-1.5 bg-slate-50/30">
                          {node.topics.map((topic, i) => {
                            const isSel = selectedTopic?._id === topic._id;

                            return (
                              <div key={i}
                                onClick={() => { onSelectNode(node); onSelectTopic(topic); }}
                                className={`flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors relative ${isSel ? 'bg-blue-50' : 'hover:bg-white'} cursor-pointer`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-slate-300 bg-white`}>
                                </div>
                                <span className={`flex-1 text-[13px] leading-snug ${isSel ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                                  {topic.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {showComingSoon && (
              <div className="relative z-10">
                {renderLevel('intermediate', intermNodes)}
                {renderLevel('experienced', expNodes)}
              </div>
            )}
          </div>
        </div>



      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={roadmap?.title || 'Roadmap'}
      />
    </div>
  );
}
