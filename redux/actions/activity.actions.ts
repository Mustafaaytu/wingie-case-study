import {Activity} from '@/interfaces/activity';
import {addAuthorizationHeader} from '@/utils/api.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchActivities = createAsyncThunk<
  Activity[],
  void,
  {rejectValue: string}
>('fetchActivities', async (_, thunkAPI) => {
  try {
    const response = await fetch(`${process.env.API_URL}activities`, {
      headers: addAuthorizationHeader(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch activities.');
    }

    let activities: Activity[] = await response.json();

    // Sort activities by date
    activities = activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return activities;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('Failed to fetch activities.');
    }
  }
});

export const fetchActivity = createAsyncThunk<Activity, String>(
  'fetchActivity',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.API_URL}activities/${id}`, {
        headers: addAuthorizationHeader(),
      });
      const data = await response.json();
      const activity = data;
      return activity;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);
