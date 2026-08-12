import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSurveys = createAsyncThunk(
  'surveys/fetchSurveys',
  async () => {
    const res = await axios.get('/api/surveys');
    return res.data;
  }
);

export const submitSurvey = createAsyncThunk(
  'surveys/submitSurvey',
  async ({ values, navigate }) => {
    const res = await axios.post('/api/surveys', values);
    navigate('/surveys');
    return res.data;
  }
);

export const deleteSurvey = createAsyncThunk(
  'surveys/deleteSurvey',
  async (surveyId) => {
    await axios.delete(`/api/surveys/${surveyId}`);
    return surveyId;
  }
);

const surveySlice = createSlice({
  name: 'surveys',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveys.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        return state.filter((survey) => survey._id !== action.payload);
      });
  },
});

export default surveySlice.reducer;
