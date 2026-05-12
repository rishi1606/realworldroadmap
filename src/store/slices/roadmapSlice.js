import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { roadmapAPI } from '../../api/client';

export const fetchRoadmaps = createAsyncThunk('roadmap/fetchAll', async () => {
  const response = await roadmapAPI.getAll();
  return response.data;
});

export const fetchRoadmapBySlug = createAsyncThunk('roadmap/fetchBySlug', async (slug) => {
  const response = await roadmapAPI.getBySlug(slug);
  return response.data;
});

const initialState = {
  roadmaps: [],
  activeRoadmap: null,
  loading: false,
  error: null,
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    clearActiveRoadmap: (state) => {
      state.activeRoadmap = null;
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
      });
  },
});

export const { clearActiveRoadmap } = roadmapSlice.actions;
export default roadmapSlice.reducer;
