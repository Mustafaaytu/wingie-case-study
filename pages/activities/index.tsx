'use client';
import { fetchActivities } from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export default function Activities() {
  const dispatch: AppDispatch = useAppDispatch();
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const loading = useSelector((state: RootState) => state.activities.loading);
  const error = useSelector((state: RootState) => state.activities.error);

  useEffect(() => {
    dispatch(fetchActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Activites</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {activities.map(activity => (
        <div key={activity.id}>
          <p>{activity.name}</p>
          <p>{activity.date}</p>
        </div>
      ))}
    </div>
  );
}
