import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { submitSurvey } from './surveySlice';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await axios.get('/api/current_user');
  return res.data;
});

export const handleToken = createAsyncThunk(
  'auth/handleToken',
  async (token) => {
    const res = await axios.post('/api/stripe', token);
    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (_state, action) => {
        return action.payload || false;
      })
      .addCase(handleToken.fulfilled, (_state, action) => {
        return action.payload || false;
      })
      .addCase(submitSurvey.fulfilled, (_state, action) => {
        return action.payload || _state;
      });
  },
});

export default authSlice.reducer;
