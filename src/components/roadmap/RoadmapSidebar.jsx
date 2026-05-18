import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiShare2, FiMap, FiFolder, FiZap, FiLock, FiSettings, FiLayers, FiLink, FiCode, FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox, FiX, FiCheck, FiBell, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { ShareModal } from '../common/ShareModal';
import { notifyAPI } from '../../api/client';

const NODE_ICONS = [FiSettings, FiLayers, FiZap, FiLink, FiCode, FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox];

// ─── Notify Modal Component ───────────────────────────────────────────────────
function NotifyModal({ roadmapId, user, isOpen, onClose, isSubscribed, onSubscribeSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      setEmail(user?.email || '');
    }
  }, [isOpen, user]);

  const handleNotify = async () => {
    const emailToUse = email;
    if (!emailToUse?.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToUse)) return;
    setLoading(true);
    try {
      await notifyAPI.subscribe(emailToUse, roadmapId, 'all');
      onSubscribeSuccess();
      setTimeout(() => onClose(), 1000);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md font-sans">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200 border border-slate-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
          <FiX className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#F4F4F5] flex items-center justify-center mb-4">
            <FiLock className="w-6 h-6 text-slate-500" />
          </div>
          <h3 className="text-[22px] font-bold text-slate-900 mb-2">Get Notified</h3>
          <p className="text-[14px] text-slate-500 mb-8 px-2 leading-relaxed">
            Enter your email to be the first to know when the advanced modules are released.
          </p>

          {isSubscribed ? (
            <div className="w-full bg-green-50 border border-green-200 rounded-lg py-3 text-green-700 text-[14px] font-semibold flex items-center justify-center gap-2">
              <FiCheck className="w-5 h-5" /> You're on the list!
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left w-full">
                <input
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleNotify()}
                  placeholder="your@email.com"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={handleNotify}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-md text-[15px] font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none bg-slate-900 text-white hover:bg-slate-800 h-11 px-4 py-2 w-full shadow-sm"
              >
                {loading ? "Subscribing..." : (
                  <>
                    <FiBell className="w-4 h-4" />
                    Notify Me
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Main Sidebar ──────────────────────────────────────────────────────────────
export function RoadmapSidebar({ roadmap, data, selectedNode, onSelectNode, selectedTopic, onSelectTopic, topicStatus, updateStatus }) {
  const { user, setShowLoginModal } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotifyLoading, setIsNotifyLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('all');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    setShareUrl(window.location.href);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (user?.email && roadmap?._id) {
        notifyAPI.check(user.email, roadmap._id, 'all')
          .then(res => setIsSubscribed(res.data.isSubscribed))
          .catch(() => { })
          .finally(() => setIsNotifyLoading(false));
      } else {
        setIsNotifyLoading(false);
      }
    }
  }, [mounted, user, roadmap]);

  const nodesWithLevels = useMemo(() =>
    (data || []).map(n => ({ ...n, _level: n.level || 'freshers' })), [data]);

  const fresherNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'freshers'), [nodesWithLevels]);
  const intermNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'intermediate'), [nodesWithLevels]);
  const expNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'experienced'), [nodesWithLevels]);
  const comingSoonCount = intermNodes.length + expNodes.length;

  const showFreshers = activeLevel === 'all' || activeLevel === 'freshers';
  const showComingSoon = activeLevel === 'all' || activeLevel === 'comingSoon';

  const handleNotifyClick = () => {
    if (!user) return setShowLoginModal(true);
    setShowNotify(true);
  };

  const renderLevel = (levelKey, nodes) => {
    if (!nodes || nodes.length === 0) return null;
    const isInter = levelKey === 'intermediate';
    const levelNum = isInter ? 2 : 3;
    const theme = isInter
      ? {
        bg: 'bg-blue-500/5',
        accent: 'bg-blue-500',
        text: 'text-blue-600',
        title: 'text-slate-900',
        dot: 'bg-blue-500',
        btn: 'bg-blue-500/10 border-blue-200 text-blue-600',
        progress: 35
      }
      : {
        bg: 'bg-purple-500/5',
        accent: 'bg-purple-500',
        text: 'text-purple-600',
        title: 'text-slate-900',
        dot: 'bg-purple-500',
        btn: 'bg-purple-500/10 border-purple-200 text-purple-600',
        progress: 10
      };

    const levelTitle = isInter ? "Intermediate" : "Advanced";

    return (
      <div className="relative flex w-full">
        {/* Left Vertical Line with Lock */}
        <div className="flex flex-col items-center shrink-0 w-8 mr-4 relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-50 text-slate-400 z-10 shadow-sm border border-slate-200">
            <FiLock className="w-3 h-3" />
          </div>
          <div className="flex-1 w-[2px] bg-slate-100" />
        </div>

        {/* Level Card */}
        <div className={`flex-1 rounded-2xl border border-slate-200 bg-white p-4 mb-6 shadow-sm group hover:border-slate-300 transition-all`}>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Level {levelNum}: {levelTitle}</h3>
            <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">Coming Soon</span>
          </div>

          <div className="text-[12px] text-slate-500 mb-4 font-medium">{isInter ? "In Progress • " : ""}Launching Soon</div>

          {/* Progress Bar - Only for Intermediate */}
          {/* {isInter && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${theme.accent} transition-all duration-1000`} style={{ width: `${theme.progress}%` }} />
              </div>
              <span className="text-[12px] font-bold text-slate-400">{theme.progress}%</span>
            </div>
          )} */}

          {/* Topics List */}
          <ul className={`flex flex-col gap-3 ${isInter ? 'mb-6' : 'mb-2'}`}>
            {nodes.map((n, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0 shadow-sm`} />
                <span className="text-[13px] font-medium text-slate-600 tracking-tight">{n.title}</span>
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
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
          {roadmap?.title || 'Roadmap'}
        </h1>
        <p className="text-slate-500 text-[14px] mb-6 leading-relaxed">
          {roadmap?.description || 'Step by step guide to mastering this topic'}
        </p>

        {/* ── Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 w-full mt-5 mb-5">
          <div className="flex gap-6 text-[14px]">
            <span className="flex items-center gap-2 font-bold text-slate-900 border-b-2 border-slate-900 pb-2 cursor-pointer">
              <FiMap className="w-4 h-4" /> Roadmap
            </span>
            {/* <span className="flex items-center gap-2 text-slate-500 font-semibold pb-2 cursor-pointer hover:text-slate-900 transition-colors">
              <FiFolder className="w-4 h-4" /> Projects
            </span> */}
          </div>

          {!isNotifyLoading && !isSubscribed && (
            <button
              onClick={handleNotifyClick}
              className="flex items-center gap-1.5 text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors pb-2"
            >
              <FiBell className="w-3.5 h-3.5" />
              Notify Me
            </button>
          )}
          {!isNotifyLoading && isSubscribed && (
            <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 pb-2">
              <FiCheck className="w-3.5 h-3.5" />
              Notified
            </div>
          )}
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
                  const isNodeDone = node.topics?.length > 0 && node.topics.every(t => topicStatus[t._id] === 'done');

                  return (
                    <div key={node._id} className="relative z-10 flex w-full">
                      <div className="flex flex-col items-center shrink-0 w-8 mr-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-black z-10 shadow-sm transition-colors ${isNodeDone ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200' : 'bg-slate-200 text-slate-700'}`}>
                          {index + 1}
                        </div>

                        {!isLast && <div className="flex-1 w-[2px] bg-slate-200 my-1" />}
                        {isLast && showComingSoon && <div className="flex-1 w-[2px] bg-slate-100 h-14 -mb-8" />}
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
                            const isDone = topicStatus[topic._id] === 'done';

                            return (
                              <div key={i}
                                className={`flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors relative ${isSel ? 'bg-blue-50' : 'hover:bg-slate-50'} cursor-pointer group/topic`}
                              >
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(topic._id);
                                  }}
                                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${isDone ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm' : 'border-slate-300 bg-white hover:border-emerald-400'}`}
                                >
                                  {isDone && <FiCheck className="w-2.5 h-2.5 text-emerald-600" />}
                                </div>
                                <span
                                  onClick={() => { onSelectNode(node); onSelectTopic(topic); }}
                                  className={`flex-1 text-[13px] leading-snug ${isSel ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}
                                >
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
              <div className="relative z-10 w-full">
                {renderLevel('intermediate', intermNodes)}
                {renderLevel('experienced', expNodes)}
              </div>
            )}
          </div>
        </div>

        {/* ── Founder Access Footer Chip */}

      </div>

      <NotifyModal
        roadmapId={roadmap?._id}
        user={user}
        isOpen={showNotify}
        onClose={() => setShowNotify(false)}
        isSubscribed={isSubscribed}
        onSubscribeSuccess={() => setIsSubscribed(true)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={roadmap?.title || 'Roadmap'}
      />
    </div>
  );
}
