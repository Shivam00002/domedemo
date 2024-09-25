import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import homesReducer from './homesSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        homes: homesReducer,
    },
});