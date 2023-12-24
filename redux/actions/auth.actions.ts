import {AppDispatch, RootState} from '@/redux/store';
import {User} from '@/interfaces/user';
import {createAsyncThunk} from '@reduxjs/toolkit';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginCredentials>(
  'login',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(process.env.API_URL + 'user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const {message, ...data} = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);

export const signup = createAsyncThunk<void, SignupCredentials>(
  'signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(process.env.API_URL + 'user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const {message} = await response.json();
      return message;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);

