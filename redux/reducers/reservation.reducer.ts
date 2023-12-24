import {Reservation} from '@/interfaces/reservation';
import {createSlice} from '@reduxjs/toolkit';
import {create, findById, payment} from '../actions/reservation.actions';

interface ReservationState {
  reservation?: Reservation;
  loading: boolean;
  error: string | null;
  paymentSuccess?: boolean | undefined;
}

const initialState: ReservationState = {
  reservation: undefined,
  loading: false,
  error: null,
};

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    clearReservation: state => {
      state.reservation = undefined;
    },
    clearPayment: state => {
      state.paymentSuccess = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(create.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(payment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSuccess = true;
      })
      .addCase(payment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(findById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default reservationSlice.reducer;
export const {clearReservation, clearPayment} = reservationSlice.actions;
