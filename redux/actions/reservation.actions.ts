import {Payment} from '@/interfaces/payment';
import {Reservation} from '@/interfaces/reservation';
import {addAuthorizationHeader} from '@/utils/api.utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

interface ReservationRequest extends Omit<Reservation, 'id' | 'activity'> {
  activityId: string;
}

export const create = createAsyncThunk<Reservation, ReservationRequest>(
  'createReservation',
  async (reservation: ReservationRequest, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.API_URL}reservation`, {
        headers: addAuthorizationHeader(),
        method: 'POST',
        body: JSON.stringify(reservation),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);

export const payment = createAsyncThunk<string, Payment>(
  'createPayment',
  async (payment: Payment, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}reservation/${payment.reservationId}/payment`,
        {
          headers: addAuthorizationHeader(),
          method: 'POST',
          body: JSON.stringify(payment),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);

export const findById = createAsyncThunk<Reservation, string>(
  'findReservation',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.API_URL}reservation/${id}`, {
        headers: addAuthorizationHeader(),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch issues.');
    }
  }
);
