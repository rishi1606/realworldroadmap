import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RoadmapSidebar } from '../components/roadmap/RoadmapSidebar';
import { RoadmapContent } from '../components/roadmap/RoadmapContent';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { useRoadmaps } from '../context/RoadmapContext';
import { progressAPI } from '../api/client';
import { SEO } from '../components/common/SEO';

export function RoadmapPage() {
  const { title } = useParams();
  const location = useLocation();
  const { user, setShowLoginModal } = useAuth();
  const { fetchAllRoadmaps, getRoadmapBySlug, roadmapsCache, roadmaps, setRoadmapsCache } = useRoadmaps();

  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topicStatus, setTopicStatus] = useState({});
  const [isProgressLoading, setIsProgressLoading] = useState(false);

  // 1. Initial Data Resolution
  useEffect(() => {
    const resolveAndFetch = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        
        // If activeRoadmap is already matching the current title/slug, avoid resolving again
        if (activeRoadmap && (activeRoadmap.title === decodedTitle || activeRoadmap.slug === decodedTitle)) {
          return;
        }
        
        // Check if we already have it in cache
        const cached = Object.values(roadmapsCache).find(r => r.title === decodedTitle || r.slug === decodedTitle);
        
        if (cached) {
          setActiveRoadmap(cached);
          setLoading(false);
        } else {
          setLoading(true);
          
          // Need to find the slug first
          const allRoadmaps = roadmaps.length > 0 ? roadmaps : await fetchAllRoadmaps();
          const found = allRoadmaps.find(r => r.title === decodedTitle || r.slug === decodedTitle);
          const targetSlug = found?.slug || decodedTitle;

          const roadmap = await getRoadmapBySlug(targetSlug);
          setActiveRoadmap(roadmap);
        }
      } catch (error) {
        console.error("Error fetching roadmap", error);
      } finally {
        setLoading(false);
      }
    };

    if (title) resolveAndFetch();
  }, [title, fetchAllRoadmaps, getRoadmapBySlug, roadmaps, roadmapsCache, activeRoadmap]);

  // 2. Selection Logic
  useEffect(() => {
    if (!activeRoadmap) return;

    const queryParams = new URLSearchParams(location.search);
    const topicSlug = queryParams.get('topic');

    let foundTopic = null;
    let foundNode = null;

    if (topicSlug && activeRoadmap.nodes) {
      for (const node of activeRoadmap.nodes) {
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
    } else if (activeRoadmap.nodes && activeRoadmap.nodes.length > 0) {
      // Default selection if none matched or no topic in URL
      if (!selectedNode || !activeRoadmap.nodes.some(n => n._id === selectedNode?._id)) {
        setSelectedNode(activeRoadmap.nodes[0]);
        setSelectedTopic(activeRoadmap.nodes[0].topics?.[0] || null);
      }
    }
  }, [activeRoadmap, location.search]);

  // 3. Progress Fetching
  useEffect(() => {
    if (activeRoadmap && user) {
      const fetchProgress = async () => {
        try {
          setIsProgressLoading(true);
          const { data } = await progressAPI.get(activeRoadmap._id);
          const statusMap = {};
          if (data.completedTopics) {
            data.completedTopics.forEach(id => {
              statusMap[id] = 'done';
            });
          }
          setTopicStatus(statusMap);
        } catch (error) {
          console.error("Failed to fetch progress", error);
        } finally {
          setIsProgressLoading(false);
        }
      };
      fetchProgress();
    }
  }, [activeRoadmap, user]);

  const updateStatus = async (topicId) => {
    if (!user) return setShowLoginModal(true);

    try {
      const { data } = await progressAPI.toggle(activeRoadmap._id, topicId);
      const statusMap = {};
      if (data.completedTopics) {
        data.completedTopics.forEach(id => {
          statusMap[id] = 'done';
        });
      }
      setTopicStatus(statusMap);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleReviewSuccess = (ratingData) => {
    setActiveRoadmap(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        averageRating: ratingData.averageRating,
        totalRatings: ratingData.totalRatings
      };
      
      setRoadmapsCache(oldCache => ({
        ...oldCache,
        [prev.slug]: updated
      }));
      
      return updated;
    });
    // Force refresh the global roadmaps list cache in context
    fetchAllRoadmaps(true);
  };

  if (loading && !activeRoadmap) {
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

  if (!activeRoadmap && !loading) {
    return (
      <div className="w-full flex justify-center py-20 text-slate-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Roadmap not found</h2>
          <p>The requested roadmap could not be loaded.</p>
        </div>
      </div>
    );
  }

  const seoTitle = activeRoadmap ? `${activeRoadmap.title} Roadmap & Scenario Guide` : "Developer Roadmap";
  const seoDesc = activeRoadmap ? `Step-by-step ${activeRoadmap.title} roadmap details. ${activeRoadmap.description || 'Master this system concept through real-world scenario architecture learning.'}` : "Master system architecture, backend flows, and frontend designs.";
  const seoKeywords = activeRoadmap ? `${activeRoadmap.title.toLowerCase()} roadmap, learn ${activeRoadmap.title.toLowerCase()}, developer roadmap, system design learning, software design scenarios` : "developer roadmaps, system design, system scaling";

  const courseSchema = activeRoadmap ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": activeRoadmap.title,
    "description": activeRoadmap.description || `Master ${activeRoadmap.title} through real-world developer scenarios and system architecture guides.`,
    "provider": {
      "@type": "Organization",
      "name": "ByteByteTech",
      "sameAs": "https://bytebytetech.com"
    }
  } : null;

  return (
    <div className="w-full bg-white text-slate-900 font-sans flex justify-center border-t border-slate-200 overflow-hidden">
      <SEO 
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        schema={courseSchema}
      />
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-[calc(100vh-65px)] md:overflow-hidden">
        <RoadmapSidebar
          roadmap={activeRoadmap}
          data={activeRoadmap.nodes || []}
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          topicStatus={topicStatus}
          updateStatus={updateStatus}
          onReviewSuccess={handleReviewSuccess}
        />
        <RoadmapContent
          roadmap={activeRoadmap}
          selectedNode={selectedNode}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          topicStatus={topicStatus}
          updateStatus={updateStatus}
          isProgressLoading={isProgressLoading}
        />
      </div>
    </div>
  );
}
