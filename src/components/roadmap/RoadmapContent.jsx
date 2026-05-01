import { useState } from "react";
import {
  FiLayers,
  FiX,
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
            {block.headers.map((header, i) => (
              <th key={i} className="text-left px-4 py-3 font-bold text-text-main">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
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

// ─── Main Component ──────────────────────────────────────────────────────────

export function RoadmapContent({ selectedNode, selectedTopic, onSelectTopic }) {
  if (!selectedNode) return null;

  const currentTopicIndex = selectedNode.topics.indexOf(selectedTopic);
  const nextTopic =
    currentTopicIndex !== -1 &&
      currentTopicIndex < selectedNode.topics.length - 1
      ? selectedNode.topics[currentTopicIndex + 1]
      : null;

  const topicBlocks = selectedNode.topicDetails?.[selectedTopic] ?? [];
  const faqs = selectedNode.faqs ?? [];

  return (
    <div
      id="roadmap-content"
      className="w-full md:w-[50%] md:h-full md:overflow-y-auto bg-bg-surface relative flex flex-col custom-scrollbar"
    >
      <div className="w-full relative">
        <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded border border-border-subtle hover:bg-bg-base text-text-muted transition-colors">
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex gap-2 p-4 border-b border-border-subtle">
          <button className="flex items-center gap-2 bg-text-main text-bg-surface px-4 py-1.5 rounded-md text-sm font-bold shadow-sm cursor-pointer">
            <FiLayers className="w-4 h-4" />
            Resources
          </button>
        </div>

        <div className="p-8 md:p-12 w-full">
          <h1 className="text-3xl font-extrabold text-text-main mb-4 tracking-tight">
            {selectedTopic || selectedNode.title}
          </h1>

          <p className="text-text-muted text-[15px] leading-relaxed mb-8 font-medium">
            {selectedNode.description}
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
                className="group flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 text-text-main px-6 py-3 rounded-lg font-bold transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                    Next Topic
                  </span>
                  <span>{nextTopic}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <FiChevronDown className="w-5 h-5 transform -rotate-90 text-gray-400" />
                </div>
              </button>
            </div>
          )}

          {/* {faqs.length > 0 && (
            <div className="mt-16 mb-8">
              <div className="inline-block bg-white border border-border-subtle px-5 py-2.5 rounded-t-lg font-bold text-text-main text-[15px] shadow-sm relative z-10 -mb-px">
                Interview Questions
              </div>
              <div className="my-4 bg-[#f8f9fa] border border-border-subtle rounded-b-lg rounded-tr-lg overflow-hidden">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} isFirst={index === 0} />
                ))}
              </div>
            </div>
          )} */}
        </div>

        <button className="fixed md:absolute bottom-8 right-8 w-12 h-12 bg-blue-400 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-blue-500 transition-colors z-50">
          <FiLayers className="w-6 h-6 transform rotate-45" />
        </button>
      </div>
    </div>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ faq, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <div className="border-b border-border-subtle last:border-b-0 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-[15px] text-text-main pr-4">
          {faq.question}
        </span>
        {isOpen ? (
          <FiChevronUp className="text-gray-400 shrink-0" />
        ) : (
          <FiChevronDown className="text-gray-400 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-6 pt-1 text-text-muted text-[15px] leading-relaxed whitespace-pre-wrap font-medium border-t border-border-subtle bg-[#f8f9fa] shadow-inner">
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
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
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
