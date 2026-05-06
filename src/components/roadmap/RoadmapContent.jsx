import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { SkeletonLoader } from "../common/SkeletonLoader";
import { Button } from "../common/Button";
import { Select } from "../common/Select";
import { notifyAPI } from "../../api/client";
import toast from "react-hot-toast";
import {
  FiLayers,
  FiX,
  FiLock,
  FiChevronDown,
  FiChevronUp,
  FiXCircle,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

// ─── Block Renderers ────────────────────────────────────────────────────────

const blockRenderers = {

  heading: ({ block, index }) => (
    <h2
      key={index}
      className="text-[20px] font-bold text-text-main mb-4 tracking-tight"
    >
      {block.text}
    </h2>
  ),

  paragraph: ({ block, index }) => (
    <p key={index} className="text-[15px] leading-relaxed mb-8 font-medium">
      {block.text}
    </p>
  ),

  code: ({ block, index }) => <CodeBlock key={index} code={block.code} />,

  image: ({ block, index }) => (
    <div key={index} className="mb-6">
      <img
        src={block.src}
        alt={block.alt}
        className="w-full rounded-lg border border-border-subtle shadow-sm object-contain"
      />
      {block.alt && (
        <p className="text-[13px] text-text-muted mt-2 text-center italic">
          {block.alt}
        </p>
      )}
    </div>
  ),

  table: ({ block, index }) => (
    <div
      key={index}
      className="overflow-x-auto mb-6 rounded-lg border border-border-subtle shadow-sm"
    >
      <table className="w-full text-[14px]">
        <thead>
          <tr className="bg-bg-subtle border-b border-border-subtle">
            {block.headers?.map((header, i) => (
              <th key={i} className="text-left px-4 py-3 font-bold text-text-main">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-bg-surface" : "bg-bg-subtle"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 text-text-muted leading-relaxed border-t border-border-subtle ${cellIndex === 0 ? "font-bold text-text-main" : ""
                    }`}
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
      className="mb-6 relative pl-6 border-l-2 border-border-subtle ml-2"
    >
      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-bg-surface" />
      <h3 className="font-bold text-[16px] text-text-main mb-1.5">
        {block.title}
      </h3>
      <p className="text-[15px] text-text-muted leading-relaxed whitespace-pre-wrap">
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

// ─── Block Dispatcher ────────────────────────────────────────────────────────

function RenderBlock({ block, index }) {
  const renderer = blockRenderers[block.type];
  return renderer ? renderer({ block, index }) : null;
}

// ─── Locked Overlay with Email Subscription ─────────────────────────────────

function LockedOverlay({ roadmapId, nodeLevel }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = async () => {
    if (!email.trim()) {
      return toast.error("Please enter your email address");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);
    try {
      const { data } = await notifyAPI.subscribe(email, roadmapId, nodeLevel);
      toast.success(data.message || "Subscribed successfully!");
      setSubscribed(true);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-auto bg-bg-surface/20">
      <div className="bg-bg-surface p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border-subtle flex flex-col items-center text-center max-w-md mx-4">
        <FiLock className="w-10 h-10 text-gray-500 mb-4" />
        <h3 className="text-[20px] font-bold text-text-main mb-2">Premium Content</h3>
        <p className="text-text-muted mb-6 text-[14px]">
          This module covers advanced engineering concepts and is currently locked.
        </p>

        {subscribed ? (
          <div className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-[14px] font-semibold flex items-center gap-2 justify-center">
            <FiCheck className="w-4 h-4" />
            You're subscribed! We'll notify you.
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              placeholder="Enter your email for updates"
              className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-bg-base text-text-main text-[14px] font-medium placeholder:text-text-muted/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all mb-3"
            />
            <Button
              onClick={handleNotify}
              disabled={loading}
              className="px-8 py-3 w-full text-[15px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Notify Me"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function RoadmapContent({ roadmap, selectedNode, selectedTopic, onSelectTopic, progress = {}, setProgress }) {
  const navigate = useNavigate();
  const { user, login, setShowLoginModal } = useAuth();

  if (!selectedNode || !selectedTopic) return null;

  const currentTopicIndex = selectedNode.topics.findIndex(t => t._id === selectedTopic._id);
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex < selectedNode.topics.length - 1
      ? selectedNode.topics[currentTopicIndex + 1]
      : null;

  const topicBlocks = selectedTopic.contentBlocks || [];

  const handleStatusChange = async (e) => {
    if (!user) {
      return setShowLoginModal(true);
    }

    const newStatus = e.target.value;

    // Optimistic update
    setProgress(prev => ({
      ...prev,
      [selectedTopic._id]: newStatus
    }));

    try {
      await axios.post(`http://localhost:5000/api/progress/${roadmap._id}/${selectedTopic._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update progress", error);
      // Could revert state here on failure
    }
  };

  const currentStatus = progress[selectedTopic._id] || "pending";
  const unlockedNodes = roadmap?.nodes?.filter(node => {
    const level = node?._level || node?.level || 'freshers';
    return level === 'freshers'; // only count free/unlocked
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
  const nodeLevel = selectedNode?._level || selectedNode?.level || 'freshers';
  const isLocked = nodeLevel === 'intermediate' || nodeLevel === 'experienced';



  return (
    <div
      id="roadmap-content"
      className="w-full md:w-[50%] md:h-full md:overflow-y-auto bg-bg-surface relative flex flex-col custom-scrollbar"
    >
      {isLocked && (
        <LockedOverlay roadmapId={roadmap?._id} nodeLevel={nodeLevel} />
      )}

      <div className={isLocked ? "opacity-30 blur-md pointer-events-none select-none transition-all duration-300 flex-1 flex flex-col" : "transition-all duration-300 flex-1 flex flex-col"}>
        <div className="w-full relative">
          <div className="flex justify-between p-4 border-b border-border-subtle items-center flex-wrap gap-4">
            <div className="flex gap-2">
            </div>

            <div className="flex items-center gap-4">
              {/* Progress Stats */}
              {user && (
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-bg-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="hidden lg:inline">Done</span>
                    <span className="text-text-muted ml-0.5">{doneCount}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-bg-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="hidden lg:inline">In Progress</span>
                    <span className="text-text-muted ml-0.5">{inProgressCount}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-bg-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    <span className="hidden lg:inline">Skipped</span>
                    <span className="text-text-muted ml-0.5">{skipCount}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-0.5 text-[11px] font-semibold text-text-main bg-bg-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span className="hidden lg:inline">Pending</span>
                    <span className="text-text-muted ml-0.5">{pendingCount}</span>
                  </div>
                </div>
              )}

              {/* Status Dropdown */}
              <div className="relative">
                {(!user || isLocked) && (
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => !user ? setShowLoginModal(true) : null}
                    title={isLocked ? "This topic is locked" : ""}
                  />
                )}
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
            </div>
          </div>



          <div className="p-8 md:p-12 w-full flex-1 flex flex-col">
            <h1 className="text-3xl font-extrabold text-text-main mb-4 tracking-tight">
              {selectedTopic.title || selectedNode.title}
            </h1>

            <p className="text-text-muted text-[15px] leading-relaxed mb-8 font-medium">
              {selectedNode.title}
            </p>

            {topicBlocks.length > 0 && (
              <div className="mt-4 mb-10">
                {topicBlocks.map((block, index) => (
                  <RenderBlock key={index} block={block} index={index} />
                ))}
              </div>
            )}

            {nextTopic && onSelectTopic && (
              <div className="mt-12 flex justify-end">
                <button
                  onClick={() => onSelectTopic(nextTopic)}
                  className="group flex items-center gap-3 bg-bg-surface border border-border-subtle hover:border-border-subtle text-text-main px-6 py-3 rounded-lg font-bold transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-0.5">
                      Next Topic
                    </span>
                    <span>{nextTopic.title}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-bg-base flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <FiChevronDown className="w-5 h-5 transform -rotate-90 text-text-muted" />
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* {faqs.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="inline-block bg-bg-surface border border-border-subtle px-5 py-2.5 rounded-t-lg font-bold text-text-main text-[15px] shadow-sm relative z-10 -mb-px">
                Interview Questions
              </div>
              <div className="my-4 bg-bg-base border border-border-subtle rounded-b-lg rounded-tr-lg overflow-hidden">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} isFirst={index === 0} />
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ faq, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <div className="border-b border-border-subtle last:border-b-0 bg-bg-surface">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-bg-base transition-colors"
      >
        <span className="font-bold text-[15px] text-text-main pr-4">
          {faq.question}
        </span>
        {isOpen ? (
          <FiChevronUp className="text-text-muted shrink-0" />
        ) : (
          <FiChevronDown className="text-text-muted shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-6 pt-1 text-text-muted text-[15px] leading-relaxed whitespace-pre-wrap font-medium border-t border-border-subtle bg-bg-base shadow-inner">
          <div className="pt-4">{faq.answer}</div>
        </div>
      )}
    </div>
  );
}

// ─── Code Block ──────────────────────────────────────────────────────────────

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 ml-2 rounded-xl overflow-hidden bg-[#1e1e1e] border border-[#2d2d2d] shadow-lg my-4">
      <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <button
          onClick={handleCopy}
          className="text-text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          {copied ? (
            <FiCheck className="w-4 h-4 text-green-400" />
          ) : (
            <FiCopy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-5 overflow-x-auto custom-scrollbar">
        <pre className="text-[13px] font-mono text-[#d4d4d4] leading-relaxed whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
