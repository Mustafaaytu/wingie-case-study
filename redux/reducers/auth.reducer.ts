// Redux slice
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@/interfaces/user';
import {login, signup} from '../actions/auth.actions';

interface AuthState {
  user?: User; // Assume you have a User interface
  loading: boolean;
  error: string | null;
  success?: boolean | undefined;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = undefined;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('auth', JSON.stringify(action.payload));
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default authSlice.reducer;
export const {updateUser, clearUser} = authSlice.actions;
