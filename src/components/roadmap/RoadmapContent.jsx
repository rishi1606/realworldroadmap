import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SkeletonLoader } from "../common/SkeletonLoader";
import { Button } from "../common/Button";
import { Select } from "../common/Select";
import {
  FiXCircle,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiLock,
  FiBell
} from "react-icons/fi";
import { notifyAPI } from "../../api/client";


// ─── Block Renderers ────────────────────────────────────────────────────────

const blockRenderers = {
  heading: ({ block, index }) => (
    <h2
      key={index}
      className="text-[20px] font-bold text-slate-900 mb-4 tracking-tight"
    >
      {block.text}
    </h2>
  ),

  paragraph: ({ block, index }) => (
    <p key={index} className="text-[15px] leading-relaxed mb-8 font-medium text-slate-700">
      {block.text}
    </p>
  ),

  code: ({ block, index }) => <CodeBlock key={index} code={block.code} />,

  image: ({ block, index, onZoom }) => (
    <div key={index} className="mb-6">
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden border border-slate-200 shadow-sm"
        onClick={() => onZoom && onZoom(block.src)}
      >
        <img
          src={block.src}
          alt={block.alt}
          className="w-full object-contain"
        />
        {/* Zoom icon — always visible, top-right */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <polyline points="21 3 14 10" />
            <polyline points="3 21 10 14" />
          </svg>
        </div>
      </div>
      {block.alt && (
        <p className="text-[13px] text-slate-500 mt-2 text-center italic">
          {block.alt}
        </p>
      )}
    </div>
  ),

  table: ({ block, index }) => (
    <div
      key={index}
      className="overflow-x-auto mb-8 rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden"
    >
      <table className="w-full text-[14px] border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            {block.headers?.map((header, i) => (
              <th key={i} className="text-left px-5 py-4 font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="group hover:bg-slate-50/30 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-5 py-4 text-slate-600 leading-relaxed border-b border-slate-200 ${rowIndex === block.rows.length - 1 ? "border-b-0" : ""
                    } ${cellIndex === 0 ? "font-bold text-slate-900" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),

  step: ({ block, index }) => (
    <div
      key={index}
      className="mb-6 relative pl-6 border-l-2 border-slate-200 ml-2"
    >
      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
      <h3 className="font-bold text-[16px] text-slate-900 mb-1.5">
        {block.title}
      </h3>
      <p className="text-[15px] text-slate-600 leading-relaxed whitespace-pre-wrap">
        {block.desc}
      </p>
    </div>
  ),

  "error-callout": ({ block, index }) => (
    <div
      key={index}
      className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-5 flex gap-4 shadow-sm mb-6"
    >
      <div className="text-red-500 shrink-0 mt-0.5">
        <FiXCircle className="w-5 h-5" />
      </div>
      <div className="text-[15px] text-[#7f1d1d] leading-relaxed">
        {block.title && <p className="font-bold mb-2">{block.title}</p>}
        {block.list && (
          <ul className="list-disc pl-5 mb-4 space-y-1 font-medium text-red-800">
            {block.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {block.footer && <p className="font-bold">{block.footer}</p>}
      </div>
    </div>
  ),

  "warning-callout": ({ block, index }) => (
    <div
      key={index}
      className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-5 shadow-sm mb-6 text-[15px] text-[#92400e] font-medium leading-relaxed"
    >
      {block.text}
    </div>
  ),

  "curious-callout": ({ block, index }) => (
    <div
      key={index}
      className="bg-[#f0f9ff] border border-[#dbeafe] rounded-lg p-5 shadow-sm mb-6 text-[15px] text-[#1e40af] font-medium leading-relaxed"
    >
      {block.text}
    </div>
  ),

  "insight-callout": ({ block, index }) => (
    <div
      key={index}
      className="bg-[#faf5ff] border border-[#e9d5ff] rounded-lg p-5 shadow-sm mb-6 text-[15px] text-[#7e22ce] font-medium leading-relaxed"
    >
      {block.text}
    </div>
  ),

  "success-callout": ({ block, index }) => (
    <div
      key={index}
      className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-5 shadow-sm mb-6 text-[15px] text-[#166534] font-medium leading-relaxed"
    >
      {block.text}
    </div>
  ),
};

function RenderBlock({ block, index, onZoom }) {
  const renderer = blockRenderers[block.type];
  return renderer ? renderer({ block, index, onZoom }) : null;
}

// ─── Image Lightbox with Scrollable Zoom ────────────────────────────────────

function ImageLightbox({ src, onClose }) {
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.25, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
  }, []);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    setScale(prev => prev > 1 ? 1 : 2.5);
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex flex-col bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
        {/* Zoom out */}
        <button
          onClick={zoomOut}
          className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200 hover:bg-white transition-all cursor-pointer"
          title="Zoom out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        {/* Zoom percentage */}
        <span className="text-white/80 text-xs font-mono bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg min-w-[48px] text-center">
          {Math.round(scale * 100)}%
        </span>
        {/* Zoom in */}
        <button
          onClick={zoomIn}
          className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200 hover:bg-white transition-all cursor-pointer"
          title="Zoom in"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        {/* Reset zoom */}
        {scale !== 1 && (
          <button
            onClick={handleReset}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200 hover:bg-white transition-all cursor-pointer"
            title="Reset zoom"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        )}
        {/* Close */}
        <button
          onClick={onClose}
          className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200 hover:bg-white transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Scrollable image container */}
      <div
        className="flex-1 overflow-auto lightbox-scrollbar flex justify-center p-6 pt-16"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={src}
          alt="Zoomed view"
          className="rounded-xl shadow-2xl select-none object-contain h-fit"
          draggable={false}
          style={{
            width: `${scale * 100}%`,
            maxWidth: 'none',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>
    </div>,
    document.body
  );
}

// ─── Locked Overlay with Email Subscription ─────────────────────────────────

function LockedOverlay({ roadmapId, nodeLevel }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleNotify = async () => {
    if (!email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setLoading(true);
    try {
      const { data } = await notifyAPI.subscribe(email, roadmapId, nodeLevel);
      setSubscribed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center text-center max-w-[400px] mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <FiLock className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-[22px] font-bold text-slate-900 mb-2">Get Notified</h3>
        <p className="text-slate-500 mb-8 text-[14px] px-2 leading-relaxed">
          Enter your email to be the first to know when the advanced modules are released.
        </p>

        {subscribed ? (
          <div className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-[14px] font-semibold flex items-center gap-2 justify-center">
            <FiCheck className="w-4 h-4" />
            You're subscribed! We'll notify you.
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              placeholder="your@email.com"
              className="flex h-10 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleNotify}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md text-[15px] font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none bg-slate-900 text-white hover:bg-slate-800 h-11 px-4 py-2 w-full"
            >
              {loading ? "Subscribing..." : <><FiBell className="w-4 h-4" /> Notify Me</>}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}



// ─── Main RoadmapContent Component ───────────────────────────────────────────

export function RoadmapContent({ roadmap, selectedNode, selectedTopic, onSelectTopic, topicStatus, updateStatus }) {
  const [viewMode, setViewMode] = useState("concept");
  const [zoomedImage, setZoomedImage] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleZoom = useCallback((src) => setZoomedImage(src), []);
  const handleCloseZoom = useCallback(() => setZoomedImage(null), []);

  // Reset view mode when topic changes
  useEffect(() => {
    setViewMode("concept");
  }, [selectedTopic?._id]);

  if (!selectedNode || !selectedTopic) return null;

  const currentTopicIndex = selectedNode.topics.findIndex(t => t._id === selectedTopic._id);
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex < selectedNode.topics.length - 1
      ? selectedNode.topics[currentTopicIndex + 1]
      : null;

  const topicBlocks = selectedTopic.contentBlocks || [];

  const hasImages = topicBlocks.some(b => b.type === 'image');

  const filteredBlocks = topicBlocks.filter(block => {
    if (viewMode === "concept") return block.type !== "image";
    if (viewMode === "image") return block.type === "image";
    return true;
  });

  const nodeLevel = selectedNode?._level || selectedNode?.level || 'freshers';
  const isLocked = nodeLevel === 'intermediate' || nodeLevel === 'experienced';

  return (
    <div id="roadmap-content" className="w-full md:w-[80%] md:h-full md:overflow-y-auto bg-white relative flex flex-col custom-scrollbar">
      {isLocked && <LockedOverlay roadmapId={roadmap?._id} nodeLevel={nodeLevel} />}

      <div className={isLocked ? "opacity-30 blur-md pointer-events-none select-none transition-all duration-300 flex-1 flex flex-col" : "transition-all duration-300 flex-1 flex flex-col"}>


        <div className="p-8 md:p-12 w-full flex-1 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200">Module</span>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {selectedNode.title}
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                {selectedTopic.title || selectedNode.title}
              </h1>
            </div>

            {/* Status Toggle Button */}
            <button
              onClick={() => updateStatus(selectedTopic._id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-extrabold transition-all shadow-sm active:scale-95 border ${
                topicStatus[selectedTopic._id] === 'done'
                  ? 'bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600 border-transparent'
                  : !user
                    ? 'bg-white text-[#2563eb] hover:bg-blue-50/50 border-[#2563eb]/20 hover:border-[#2563eb]/40'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {!user ? (
                <>
                  <FiLock className="w-3.5 h-3.5" />
                  <span>Sign in to mark as done</span>
                </>
              ) : topicStatus[selectedTopic._id] === 'done' ? (
                <>
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Mark as Done</span>
                </>
              )}
            </button>
          </div>

          {/* View Toggle */}
          {hasImages && (
            <div className="flex bg-slate-100/50 p-1 rounded-xl mb-10 w-full border border-slate-200/50">
              <button
                onClick={() => setViewMode("concept")}
                className={`flex-1 px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${viewMode === "concept"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Concept View
              </button>
              <button
                onClick={() => setViewMode("image")}
                className={`flex-1 px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${viewMode === "image"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Image View
              </button>
            </div>
          )}

          <div className="mb-10 animate-in fade-in duration-500">
            {filteredBlocks.length > 0 ? (
              filteredBlocks.map((block, index) => (
                <RenderBlock key={`${viewMode}-${index}`} block={block} index={index} onZoom={handleZoom} />
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-medium">No {viewMode} available for this topic.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {zoomedImage && <ImageLightbox src={zoomedImage} onClose={handleCloseZoom} />}
    </div>
  );
}

// ─── Code Block Component ────────────────────────────────────────────────────

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-slate-800 shadow-lg">
      <div className="bg-slate-800/50 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold">
          {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-5 overflow-x-auto custom-scrollbar">
        <pre className="text-[13px] font-mono text-slate-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
