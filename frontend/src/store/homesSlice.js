import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHomesByUser = createAsyncThunk('homes/fetchByUser', async (userId) => {
    const response = await axios.get(`/api/home/find-by-user?userId=${userId}`);
    return response.data;
});

export const fetchUsersByHome = createAsyncThunk('homes/fetchUsersByHome', async (homeId) => {
    const response = await axios.get(`/api/user/find-by-home?homeId=${homeId}`);
    return response.data;
});

export const updateHomeUsers = createAsyncThunk('homes/updateUsers', async ({ homeId, userIds }) => {
    const response = await axios.post('/api/home/update-users', { homeId, userIds });
    return response.data;
});

const homesSlice = createSlice({
    name: 'homes',
    initialState: { list: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomesByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHomesByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchHomesByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateHomeUsers.fulfilled, (state, action) => {
                // You might want to update the state here based on the response
                // For example, you could refresh the homes list or update the specific home
            });
    },
});

export default homesSlice.reducer;