import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SUMMARIZE_API_URL } from '../../utils/apiConstants';

export const fetchSummary = createAsyncThunk(
  'summary/fetchSummary',
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.post(SUMMARIZE_API_URL, { url });
      return {...response.data, url};
    } catch (error) {
      console.error(error); 
      return rejectWithValue(error.response?.data.error || 'Error fetching summary.');
    }
});

const getDefaultSummary = () => ({ summary: { pros: [], cons: [] }, totalReviews: null, image: '', name: '', address: '', lat: null, lng: null});

const persistedHistory = localStorage.getItem('history')
  ? JSON.parse(localStorage.getItem('history'))
  : [];

const initialState = {
  history: persistedHistory,
  currentSummary: getDefaultSummary(),
  isLoading: false,
  error: null,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    setCurrentSummary: (state, action) => {
      state.currentSummary = action.payload || getDefaultSummary();
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentSummary = getDefaultSummary();
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.currentSummary = action.payload;

        const existingIndex = state.history.findIndex(item => item.url === action.payload.url);
        if (existingIndex >= 0) {
          state.history.splice(existingIndex, 1);
        } else if (state.history.length > 5) {
            state.history.pop();
          }
        
        state.history.unshift(action.payload);

        state.isLoading = false;
        state.error = null;
        localStorage.setItem('history', JSON.stringify(state.history));
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentSummary = getDefaultSummary();
      });
  },
});

export const { setCurrentSummary } = summarySlice.actions;
export default summarySlice.reducer;
