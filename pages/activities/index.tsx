'use client';
import {Container, Title} from '@/styles/sharedstyles';
import {Card} from '@/components/Card/Card';
import {fetchActivities} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Loading from '@/components/Loading/Loading';
import withAuth from '@/components/WithAuth/WithAuth';
import {formatDate} from '@/utils/date.utils';

const Activities = () => {
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
    <Container>
      <Title>Activities</Title>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {activities.map(activity => (
          <Card key={activity.id}>
            <p className="title">{activity.name}</p>
            <p>{formatDate(activity.date)}</p>
            <p>{activity.description}</p>
            <p>{activity.price}$</p>
            <Link href={`/activities/${activity.id}`}>Select</Link>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default withAuth(Activities);
