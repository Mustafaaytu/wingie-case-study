import { Activity } from '@/interfaces/activity'
import { createSlice } from '@reduxjs/toolkit'
import { fetchActivities, fetchActivity } from '../actions/activity.actions'

interface ActivitiesState {
  activities: Activity[]
  activity?: Activity
  loading: boolean
  error: string | null
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null,
}

export const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false
        state.activities = action.payload
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false
        state.activity = action.payload
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default activitySlice.reducer
