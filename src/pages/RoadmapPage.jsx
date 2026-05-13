import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RoadmapSidebar } from '../components/roadmap/RoadmapSidebar';
import { RoadmapContent } from '../components/roadmap/RoadmapContent';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { roadmapAPI } from '../api/client';

export function RoadmapPage() {
  const { title } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Artificial delay to ensure navigation transition is finished
    const timer = setTimeout(() => {
      setMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        // First fetch all to find the slug if title is used as ID in URL
        const { data: allRoadmaps } = await roadmapAPI.getAll();

        let targetSlug = allRoadmaps[0]?.slug;
        if (title) {
          const decodedTitle = decodeURIComponent(title);
          const found = allRoadmaps.find(r => r.title === decodedTitle || r.slug === decodedTitle);
          if (found) targetSlug = found.slug;
        }

        if (targetSlug) {
          const { data: roadmap } = await roadmapAPI.getBySlug(targetSlug);
          setActiveRoadmap(roadmap);

          // Initial selection logic
          const queryParams = new URLSearchParams(location.search);
          const topicSlug = queryParams.get('topic');

          let foundTopic = null;
          let foundNode = null;

          if (topicSlug && roadmap.nodes) {
            for (const node of roadmap.nodes) {
              const topic = node.topics?.find(t => t.slug === topicSlug);
              if (topic) {
                foundTopic = topic;
                foundNode = node;
                break;
              }
            }
          }

          if (foundNode && foundTopic) {
            setSelectedNode(foundNode);
            setSelectedTopic(foundTopic);

            setTimeout(() => {
              const contentEl = document.getElementById('roadmap-content');
              if (contentEl) {
                const y = contentEl.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 100);
          } else if (roadmap.nodes && roadmap.nodes.length > 0) {
            setSelectedNode(roadmap.nodes[0]);
            setSelectedTopic(roadmap.nodes[0].topics?.[0] || null);
          }


        }
      } catch (error) {
        console.error("Error fetching roadmap", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [title, user, location.search, mounted]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
    setSelectedTopic(node?.topics?.[0] || null);
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

  if (loading || !mounted) {
    return (
      <div className="w-full bg-white text-slate-900 font-sans flex justify-center border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-[calc(100vh-4rem)] md:overflow-hidden">
          <div className="w-full md:w-[50%] p-12 md:overflow-y-auto border-r border-slate-200 flex flex-col items-center">
            <div className="w-full max-w-[400px]">
              <SkeletonLoader type="card" />
              <div className="mt-8">
                <SkeletonLoader type="card" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[50%] p-12 md:overflow-y-auto">
            <SkeletonLoader type="content" />
          </div>
        </div>
      </div>
    );
  }

  if (!activeRoadmap) {
    return (
      <div className="w-full flex justify-center py-20 text-slate-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Roadmap not found</h2>
          <p>The requested roadmap could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-slate-900 font-sans flex justify-center border-t border-slate-200 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-[calc(100vh-65px)] md:overflow-hidden">
        <RoadmapSidebar
          roadmap={activeRoadmap}
          data={activeRoadmap.nodes || []}
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
        <RoadmapContent
          roadmap={activeRoadmap}
          selectedNode={selectedNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
      </div>
    </div>
  );
}
