import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import activityReducer from './reducers/activity.reducer'

const reducer = {
  activities: activityReducer,
}

const store = configureStore({
  reducer,
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
