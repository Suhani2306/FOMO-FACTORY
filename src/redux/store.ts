import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './reducer';

export const store = configureStore({
    reducer: {
        coin: coinReducer
    },
});
