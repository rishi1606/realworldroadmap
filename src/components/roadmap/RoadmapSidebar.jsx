import React, { useState, useEffect, useMemo } from 'react';
import {
  FiCheck, FiBookmark, FiBell, FiShare2, FiMap, FiFolder,
  FiZap, FiLock, FiSettings, FiLayers, FiLink, FiCode,
  FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox, FiX
} from 'react-icons/fi';

// Cycle of different icons for each node
const NODE_ICONS = [FiSettings, FiLayers, FiZap, FiLink, FiCode, FiDatabase, FiGlobe, FiCpu, FiKey, FiServer, FiBox];
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookmarkAPI, notifyAPI } from '../../api/client';
import toast from 'react-hot-toast';
import { RatingBadge } from '../common/RatingBadge';
import { ShareModal } from '../common/ShareModal';
import { Button } from '../common/Button';

// ─── Coming Soon Section ───────────────────────────────────────────────────────
function ComingSoonSection({ intermNodes, expNodes, roadmapId, user }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      notifyAPI.check(user.email)
        .then(({ data }) => {
          if (data.isSubscribed) setSubscribed(true);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleNotify = async () => {
    if (!email.trim()) return toast.error('Please enter your email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Invalid email');
    setLoading(true);
    try {
      const { data } = await notifyAPI.subscribe(email, roadmapId, 'all');
      toast.success(data.message || 'Subscribed!');
      setSubscribed(true);
      setTimeout(() => setShowModal(false), 2000);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong.');
    } finally { setLoading(false); }
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
      <div className={`w-full rounded-lg ${theme.bg} p-5 flex flex-col`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full ${theme.iconBg} flex items-center justify-center shrink-0`}>
              <FiZap className={`w-3.5 h-3.5 ${theme.icon}`} />
            </div>
            <span className={`text-[13px] font-bold ${theme.title} leading-tight`}>{cardTitle}</span>
          </div>
          <FiLock className={`w-4 h-4 ${theme.icon} shrink-0 mt-0.5`} />
        </div>
        <ul className="flex flex-col gap-1.5 ml-1 flex-1">
          {nodes.map((n, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} shrink-0 mt-[7px]`} />
              <span className={`text-[13px] font-medium ${theme.bullet} leading-snug`}>{n.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="w-full rounded-xl border border-slate-200 bg-white p-5 mt-6 shadow-sm flex flex-col gap-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
          {renderLevel('intermediate', intermNodes)}
          {renderLevel('experienced', expNodes)}
        </div>

        <div className="border-t border-dashed border-slate-200 pt-5 flex justify-center">
          {subscribed ? (
            <div className="w-full bg-green-50 border border-green-200 rounded-lg py-3 text-green-700 text-[14px] font-semibold flex items-center justify-center gap-2">
              <FiCheck className="w-5 h-5" /> All set! You will be notified.
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-dashed border-slate-300 text-slate-700 text-[14px] font-bold transition-colors cursor-pointer hover:bg-slate-50"
            >
              <FiBell className="w-4 h-4" />
              Notify Me for Upcoming Levels
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FiLock className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-[18px] font-bold text-text-main mb-2">Get Notified</h3>
              <p className="text-[14px] text-text-muted mb-6 leading-relaxed">
                Enter your email to be the first to know when the advanced modules are released.
              </p>
              
              {subscribed ? (
                <div className="w-full bg-green-50 border border-green-200 rounded-lg py-3 text-green-700 text-[14px] font-semibold flex items-center justify-center gap-2">
                  <FiCheck className="w-5 h-5" /> You're on the list!
                </div>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <input
                    autoFocus type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleNotify()}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-[14px] text-text-main placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-all"
                  />
                  <button
                    onClick={handleNotify} disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-[14px] font-semibold transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <FiBell className="w-4 h-4" />
                    {loading ? 'Subscribing...' : 'Notify Me'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Sidebar ──────────────────────────────────────────────────────────────
export function RoadmapSidebar({ roadmap, data, selectedNode, onSelectNode, selectedTopic, onSelectTopic, progress = {} }) {
  const { user, requireAuth } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState('all');

  useEffect(() => {
    if (!user || !roadmap?._id) return;
    bookmarkAPI.getBookmarks()
      .then(({ data }) => setIsBookmarked(data.some(b => b._id === roadmap._id || b === roadmap._id)))
      .catch(() => {});
  }, [roadmap, user]);

  const handleBookmarkToggle = async () => {
    if (!requireAuth()) return;
    try {
      const { data } = await bookmarkAPI.toggleBookmark(roadmap._id);
      setIsBookmarked(data.isBookmarked);
      toast.success(data.isBookmarked ? 'Bookmark added' : 'Bookmark removed');
    } catch { toast.error('Failed to update bookmark'); }
  };

  const nodesWithLevels = useMemo(() =>
    (data || []).map(n => ({ ...n, _level: n.level || 'freshers' })), [data]);

  const fresherNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'freshers'), [nodesWithLevels]);
  const intermNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'intermediate'), [nodesWithLevels]);
  const expNodes = useMemo(() => nodesWithLevels.filter(n => n._level === 'experienced'), [nodesWithLevels]);
  const comingSoonCount = intermNodes.length + expNodes.length;

  const showFreshers = activeLevel === 'all' || activeLevel === 'freshers';
  const showComingSoon = activeLevel === 'all' || activeLevel === 'comingSoon';

  return (
    <div className="w-full md:w-[50%] md:h-full md:overflow-y-auto border-b md:border-b-0 md:border-r border-border-subtle relative z-20 bg-bg-base custom-scrollbar">
      <div className="p-6 md:p-8 pb-16 flex flex-col items-start">

        {/* ── Top actions */}
        <div className="flex items-center justify-between mb-6 w-full">
          <Link to="/" className="text-text-muted font-semibold text-[13px] hover:text-brand transition-colors">
            ← All Roadmaps
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleBookmarkToggle}
              className={`cursor-pointer !shadow-none ${isBookmarked ? 'text-brand border-brand/20 bg-brand/5' : 'text-text-muted'}`}>
              <FiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsShareOpen(true)}
              className="text-text-muted cursor-pointer !shadow-none">
              <FiShare2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── Title */}
        <h1 className="text-[28px] md:text-[32px] font-extrabold text-text-main mb-2 tracking-tight leading-[1.15]">
          {roadmap?.title || 'Roadmap'}
        </h1>
        <p className="text-text-muted text-[14px] mb-4 leading-relaxed font-medium">
          {roadmap?.description || 'Step by step guide to mastering this topic'}
        </p>

        <RatingBadge roadmapId={roadmap?._id} />

        {/* ── Tabs */}
        <div className="flex gap-6 border-b border-border-subtle w-full mt-5 mb-5 text-[14px]">
          <span className="flex items-center gap-2 font-bold text-text-main border-b-2 border-text-main pb-2 cursor-pointer">
            <FiMap className="w-4 h-4" /> Roadmap
          </span>
          <span className="flex items-center gap-2 text-text-muted font-semibold pb-2 cursor-pointer hover:text-text-main transition-colors">
            <FiFolder className="w-4 h-4" /> Projects
          </span>
        </div>

        {/* ── Filter chips: Freshers (N) | Coming Soon (N) */}
        <div className="flex items-center gap-2 flex-wrap mb-5 w-full">
          {[
            { key: 'freshers', label: 'Freshers', count: fresherNodes.length, dot: 'bg-emerald-500' },
            { key: 'comingSoon', label: 'Coming Soon', count: comingSoonCount, dot: 'bg-slate-400', locked: true },
          ].map(chip => {
            const active = activeLevel === chip.key || (activeLevel === 'all');
            return (
              <button key={chip.key}
                onClick={() => {
                  setActiveLevel(prev => prev === chip.key ? 'all' : chip.key);
                  if (chip.key === 'freshers') {
                    const f = fresherNodes[0];
                    if (f) { onSelectNode(f); onSelectTopic(f.topics?.[0] || null); }
                  }
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
                  active ? 'border-slate-300 bg-white text-text-main shadow-sm' : 'border-border-subtle bg-bg-surface text-text-muted hover:text-text-main'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                {chip.label}
                {chip.locked && <FiLock className="w-2.5 h-2.5 opacity-50" />}
                <span className="text-text-muted">({chip.count})</span>
              </button>
            );
          })}
        </div>

        {/* ── Numbered nodes with dotted vertical line */}
        {showFreshers && (
          <div className="w-full relative">
            {fresherNodes.map((node, index) => {
              const NodeIcon = NODE_ICONS[index % NODE_ICONS.length];
              const isNodeSel = selectedNode?._id === node._id;
              const doneCnt = node.topics.filter(t => user && progress[t._id] === 'done').length;
              const total = node.topics.length;
              const allDone = doneCnt === total && total > 0;
              const isLast = index === fresherNodes.length - 1;

              return (
                <div key={node._id || index} className="relative flex w-full">

                  {/* Left column: circle + dotted line */}
                  <div className="flex flex-col items-center shrink-0 w-8 mr-3">
                    {/* Circle number */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-black z-10 ${
                      allDone ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {allDone ? <FiCheck className="w-3.5 h-3.5" strokeWidth={3} /> : index + 1}
                    </div>
                    {/* Dotted line below (except last node) */}
                    {!isLast && (
                      <div className="flex-1 w-0 border-l-2 border-dashed border-slate-200 mt-1 mb-0" />
                    )}
                  </div>

                  {/* Right column: header + topics in one bordered card */}
                  <div className={`flex-1 min-w-0 pb-4`}>
                    <div className={`rounded-lg border border-slate-200 bg-white ${isNodeSel ? 'shadow-sm' : ''}`}>
                      {/* Node header row */}
                      <div
                        onClick={() => { onSelectNode(node); onSelectTopic(node.topics?.[0] || null); }}
                        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
                      >
                        <NodeIcon className={`w-4 h-4 shrink-0 ${isNodeSel ? 'text-slate-700' : 'text-slate-400'}`} />
                        <span className="flex-1 text-[14px] font-bold text-text-main leading-snug">
                          {node.title}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0">
                          Freshers
                        </span>
                        <span className="text-[12px] font-semibold text-text-muted shrink-0 ml-1">
                          {doneCnt} / {total}
                        </span>
                      </div>

                      {/* Topic rows */}
                      <div className="border-t border-slate-100 px-2 py-2 flex flex-col gap-1.5">
                        {node.topics.map((topic, i) => {
                          const isSel = selectedTopic?._id === topic._id;
                          const status = user ? (progress[topic._id] || 'pending') : 'none';
                          
                          let circleClass = 'border-[1.5px] border-slate-300 bg-white';
                          if (status === 'done') circleClass = 'bg-green-500 border-green-500 text-white';
                          else if (status === 'in-progress') circleClass = 'bg-blue-500 border-blue-500 text-white';
                          else if (status === 'skip') circleClass = 'bg-gray-400 border-gray-400 text-white';
                          else if (status === 'pending') circleClass = 'bg-yellow-400 border-yellow-400 text-white';

                          return (
                            <div key={i}
                              onClick={() => { onSelectNode(node); onSelectTopic(topic); }}
                              className={`flex items-center gap-3 px-2.5 py-2 rounded-md cursor-pointer transition-colors ${
                                isSel ? 'bg-blue-50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${circleClass}`}>
                                {status === 'done' && <FiCheck className="w-2.5 h-2.5" strokeWidth={4} />}
                              </div>
                              <span className={`flex-1 text-[13px] leading-snug ${
                                isSel ? 'font-semibold text-text-main' : 'font-medium text-slate-600'
                              }`}>
                                {topic.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Coming Soon cards */}
        {showComingSoon && (
          <ComingSoonSection intermNodes={intermNodes} expNodes={expNodes} roadmapId={roadmap?._id} user={user} />
        )}

      </div>

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)}
        url={window.location.href} title={roadmap?.title || 'Roadmap'} />
    </div>
  );
}
