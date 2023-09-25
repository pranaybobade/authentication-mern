import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthSlice/AuthSlice';
import { userApi } from './UserSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});
