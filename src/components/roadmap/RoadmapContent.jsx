import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SkeletonLoader } from "../common/SkeletonLoader";
import { Button } from "../common/Button";
import { Select } from "../common/Select";
import { notifyAPI, progressAPI } from "../../api/client";
import toast from "react-hot-toast";
import {
  FiXCircle,
  FiCopy,
  FiCheck,
  FiBell,
  FiLock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

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

// ─── Locked Overlay Component ────────────────────────────────────────────────

function LockedOverlay({ roadmapId, nodeLevel }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = async () => {
    if (!email.trim()) return toast.error("Please enter your email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email");

    setLoading(true);
    try {
      await notifyAPI.subscribe(email, roadmapId, nodeLevel);
      toast.success("Subscribed!");
      setSubscribed(true);
    } catch (error) {
      toast.error("Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 flex flex-col items-center text-center max-w-[400px] mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <FiLock className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-[22px] font-bold text-slate-900 mb-2">Get Notified</h3>
        <p className="text-slate-500 mb-8 text-[14px] leading-relaxed">
          Enter your email to be the first to know when the advanced modules are released.
        </p>

        {subscribed ? (
          <div className="w-full bg-green-50 border border-green-200 rounded-lg py-3 text-green-700 text-[14px] font-semibold flex items-center justify-center gap-2">
            <FiCheck className="w-4 h-4" /> Subscribed!
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button
              onClick={handleNotify}
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-md h-11 font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Notify Me"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Main RoadmapContent Component ───────────────────────────────────────────

export function RoadmapContent({ roadmap, selectedNode, selectedTopic, onSelectTopic, progress = {}, setProgress, isProgressLoading }) {
  const navigate = useNavigate();
  const { user, setShowLoginModal } = useAuth();

  if (!selectedNode || !selectedTopic) return null;

  const currentTopicIndex = selectedNode.topics.findIndex(t => t._id === selectedTopic._id);
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex < selectedNode.topics.length - 1
      ? selectedNode.topics[currentTopicIndex + 1]
      : null;

  const topicBlocks = selectedTopic.contentBlocks || [];

  const handleStatusChange = async (e) => {
    if (!user) return setShowLoginModal(true);

    const newStatus = e.target.value;
    const oldStatus = progress[selectedTopic._id];

    // Optimistic update
    setProgress(prev => ({ ...prev, [selectedTopic._id]: newStatus }));

    try {
      await progressAPI.updateTopic(roadmap._id, selectedTopic._id, newStatus);
      toast.success(`Updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update progress");
      setProgress(prev => ({ ...prev, [selectedTopic._id]: oldStatus }));
    }
  };

  const currentStatus = progress[selectedTopic._id] || "pending";
  const nodeLevel = selectedNode?._level || selectedNode?.level || 'freshers';
  const isLocked = nodeLevel === 'intermediate' || nodeLevel === 'experienced';

  // Accurate progress calculations matching Next.js logic
  const unlockedNodes = roadmap?.nodes?.filter(node => {
    const level = node?._level || node?.level || 'freshers';
    return level === 'freshers';
  }) || [];

  const totalTopics = unlockedNodes.reduce(
    (acc, node) => acc + (node.topics?.length || 0),
    0
  );

  const progressValues = Object.values(progress);
  const doneCount = progressValues.filter(s => s === 'done').length;
  const inProgressCount = progressValues.filter(s => s === 'in-progress').length;
  const skipCount = progressValues.filter(s => s === 'skip').length;
  const pendingCount = Math.max(0, totalTopics - (doneCount + inProgressCount + skipCount));

  return (
    <div id="roadmap-content" className="w-full md:w-[50%] md:h-full md:overflow-y-auto bg-white relative flex flex-col custom-scrollbar">
      {isLocked && <LockedOverlay roadmapId={roadmap?._id} nodeLevel={nodeLevel} />}

      <div className={isLocked ? "opacity-30 blur-md pointer-events-none transition-all duration-300 flex-1" : "transition-all duration-300 flex-1"}>
        <div className="flex justify-between p-4 border-b border-slate-200 items-center flex-wrap gap-4 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="hidden lg:inline">Done</span>
                  <span className="text-slate-500 ml-0.5">{isProgressLoading ? '-' : doneCount}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="hidden lg:inline">Doing</span>
                  <span className="text-slate-500 ml-0.5">{isProgressLoading ? '-' : inProgressCount}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span className="hidden lg:inline">Skipped</span>
                  <span className="text-slate-500 ml-0.5">{isProgressLoading ? '-' : skipCount}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="hidden lg:inline">Pending</span>
                  <span className="text-slate-500 ml-0.5">{isProgressLoading ? '-' : pendingCount}</span>
                </div>
              </div>
            )}
          </div>

          <Select
            value={currentStatus}
            onChange={handleStatusChange}
            disabled={isLocked}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'skip', label: 'Skip' },
              { value: 'done', label: 'Done' }
            ]}
          />
        </div>

        <div className="p-8 md:p-12 w-full flex-1">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {selectedTopic.title || selectedNode.title}
          </h1>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-10 font-medium italic border-l-4 border-slate-200 pl-4">
            Module: {selectedNode.title}
          </p>

          <div className="mb-10">
            {topicBlocks.map((block, index) => (
              <RenderBlock key={index} block={block} index={index} />
            ))}
          </div>

          {nextTopic && (
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => onSelectTopic(nextTopic)}
                className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-blue-200 px-6 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Up Next</span>
                  <span className="text-slate-900">{nextTopic.title}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <FiChevronDown className="w-5 h-5 -rotate-90 text-slate-400 group-hover:text-blue-500" />
                </div>
              </button>
            </div>
          )}
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
