import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roadmapData } from '../data/roadmapData';
import { RoadmapSidebar } from '../components/roadmap/RoadmapSidebar';
import { RoadmapContent } from '../components/roadmap/RoadmapContent';

export function RoadmapPage() {
  const { title } = useParams();

  // Find the active roadmap based on title, fallback to the first roadmap
  const activeRoadmap = title
    ? roadmapData?.find(roadmap => roadmap.title === decodeURIComponent(title)) || roadmapData[0]
    : roadmapData[0];

  const initialNode = activeRoadmap?.nodes?.[0] || null;

  const [selectedNode, setSelectedNode] = useState(initialNode);
  const [selectedTopic, setSelectedTopic] = useState(initialNode?.topics?.[0] || null);

  useEffect(() => {
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      const roadmap = roadmapData.find(r => r.title === decodedTitle);
      if (roadmap && roadmap.nodes?.length > 0) {
        setSelectedNode(roadmap.nodes[0]);
        setSelectedTopic(roadmap.nodes[0]?.topics?.[0] || null);
      }
    }
  }, [title]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
    setSelectedTopic(node?.topics?.[0] || null); // Reset topic to first on node change
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const contentEl = document.getElementById('roadmap-content');
        if (contentEl) {
          const y = contentEl.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  if (!activeRoadmap) return <div>Roadmap not found</div>;

  return (
    <div className="w-full bg-bg-base text-black font-sans flex justify-center border-t border-border-subtle">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-[calc(100vh-4rem)] md:overflow-hidden">
        <RoadmapSidebar
          roadmap={activeRoadmap}
          data={activeRoadmap.nodes || []}
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
        <RoadmapContent
          selectedNode={selectedNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
      </div>
    </div>
  );
}
