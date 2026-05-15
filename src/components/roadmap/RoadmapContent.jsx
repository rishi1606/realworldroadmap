import { useState, useEffect } from "react";
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

  image: ({ block, index }) => (
    <div key={index} className="mb-6">
      <img
        src={block.src}
        alt={block.alt}
        className="w-full rounded-lg border border-slate-200 shadow-sm object-contain"
      />
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

function RenderBlock({ block, index }) {
  const renderer = blockRenderers[block.type];
  return renderer ? renderer({ block, index }) : null;
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
  const navigate = useNavigate();
  const { user } = useAuth();

  // Reset view mode when topic changes
  useEffect(() => {
    setViewMode("concept");
  }, [selectedTopic._id]);

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


        <div className="p-8 md:p-12 w-full flex-1">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {selectedTopic.title || selectedNode.title}
            </h1>

            {/* Status Toggle Button */}
            <button
              onClick={() => updateStatus(selectedTopic._id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${topicStatus[selectedTopic._id] === 'done'
                ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}`}
            >
              {topicStatus[selectedTopic._id] === 'done' ? (
                <><FiCheck className="w-4 h-4" /> Completed</>
              ) : (
                "Mark as Done"
              )}
            </button>
          </div>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-6 font-medium italic border-l-4 border-slate-200 pl-4">
            Module: {selectedNode.title}
          </p>

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
                <RenderBlock key={`${viewMode}-${index}`} block={block} index={index} />
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-medium">No {viewMode} available for this topic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
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
