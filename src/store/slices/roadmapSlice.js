import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roadmapAPI, progressAPI } from '../../api/client';

export const fetchRoadmaps = createAsyncThunk('roadmap/fetchAll', async () => {
  const response = await roadmapAPI.getAll();
  return response.data;
});

export const fetchRoadmapBySlug = createAsyncThunk('roadmap/fetchBySlug', async (slug) => {
  const response = await roadmapAPI.getBySlug(slug);
  return response.data;
});

export const fetchUserProgress = createAsyncThunk('roadmap/fetchProgress', async (roadmapId) => {
  const response = await progressAPI.getForRoadmap(roadmapId);
  return response.data;
});

export const updateProgress = createAsyncThunk('roadmap/updateProgress', async ({ roadmapId, topicId, status }) => {
  const response = await progressAPI.updateTopic(roadmapId, topicId, status);
  return { topicId, status };
});

const initialState = {
  roadmaps: [],
  activeRoadmap: null,
  progress: {},
  loading: false,
  error: null,
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    clearActiveRoadmap: (state) => {
      state.activeRoadmap = null;
      state.progress = {};
    },
    clearProgress: (state) => {
      state.progress = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchRoadmaps.pending, (state) => { state.loading = true; })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmaps = action.payload;
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Single
      .addCase(fetchRoadmapBySlug.pending, (state) => { state.loading = true; })
      .addCase(fetchRoadmapBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.activeRoadmap = action.payload;
      })
      // Fetch Progress
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      // Update Progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.progress[action.payload.topicId] = action.payload.status;
      });
  },
});

export const { clearActiveRoadmap, clearProgress } = roadmapSlice.actions;
export default roadmapSlice.reducer;
