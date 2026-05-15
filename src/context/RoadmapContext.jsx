import React, { createContext, useContext, useState, useCallback } from 'react';
import { roadmapAPI } from '../api/client';

const RoadmapContext = createContext();

export function RoadmapProvider({ children }) {
  const [roadmaps, setRoadmaps] = useState([]);
  const [roadmapsCache, setRoadmapsCache] = useState({}); // { slug: roadmapData }
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(false);

  const fetchAllRoadmaps = useCallback(async (force = false) => {
    if (roadmaps.length > 0 && !force) return roadmaps;
    
    setLoadingRoadmaps(true);
    try {
      const { data } = await roadmapAPI.getAll();
      setRoadmaps(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch roadmaps", error);
      return [];
    } finally {
      setLoadingRoadmaps(false);
    }
  }, [roadmaps]);

  const getRoadmapBySlug = useCallback(async (slug, force = false) => {
    if (roadmapsCache[slug] && !force) return roadmapsCache[slug];
    
    try {
      const { data } = await roadmapAPI.getBySlug(slug);
      setRoadmapsCache(prev => ({ ...prev, [slug]: data }));
      return data;
    } catch (error) {
      console.error(`Failed to fetch roadmap: ${slug}`, error);
      throw error;
    }
  }, [roadmapsCache]);

  return (
    <RoadmapContext.Provider value={{ 
      roadmaps, 
      fetchAllRoadmaps, 
      getRoadmapBySlug, 
      loadingRoadmaps,
      roadmapsCache 
    }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmaps() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmaps must be used within a RoadmapProvider');
  }
  return context;
}
