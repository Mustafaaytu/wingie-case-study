import { Activity } from '@/interfaces/activity'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchActivities = createAsyncThunk<
  Activity[],
  void,
  { rejectValue: string }
>('fetchActivities', async (_, thunkAPI) => {
  try {
    const response = await fetch('/api/activities')
    const data = await response.json()
    const activities = data.map(
      (activity: { id: number; name: string; date: string }) => activity,
    )
    return activities
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch issues.')
  }
})

export const fetchActivity = createAsyncThunk<Activity, number>(
  'fetchActivity',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`/api/activities/${id}`)
      const data = await response.json()
      const activity = data
      return activity
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.')
    }
  },
)
