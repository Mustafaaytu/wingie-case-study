'use client';
import {Container, Title} from '@/styles/sharedstyles';
import {Card} from './styles';
import {fetchActivities} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Loading from '@/components/Loading/Loading';
import {useRouter} from 'next/router';

export default function Activities() {
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const loading = useSelector((state: RootState) => state.activities.loading);
  const error = useSelector((state: RootState) => state.activities.error);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    dispatch(fetchActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Title>Activities</Title>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {activities.map(activity => (
          <Card key={activity.id}>
            <p>{activity.name}</p>
            <p>{activity.date}</p>
            <p>{activity.details}</p>
            <Link href={`/activities/${activity.id}`}>Select</Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}
