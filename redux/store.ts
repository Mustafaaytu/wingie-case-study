import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import activityReducer from './reducers/activity.reducer';
import authReducer from './reducers/auth.reducer';

const reducer = {
  activities: activityReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer,
});

export {store};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
