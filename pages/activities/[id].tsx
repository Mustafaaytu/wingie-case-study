import {Activity} from '@/interfaces/activity';
import {fetchActivity} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import {AsyncThunkAction, Dispatch, UnknownAction} from '@reduxjs/toolkit';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
const activity = () => {
  const router = useRouter();
  const {id} = router.query;
  const dispatch: AppDispatch = useAppDispatch();
  const activity: Activity | undefined = useSelector(
    (state: RootState) => state.activities.activity
  );
  const loading = useSelector((state: RootState) => state.activities.loading);
  const error = useSelector((state: RootState) => state.activities.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivity(Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>Activity Detail Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {activity && (
        <div>
          <p>{activity.name}</p>
          <p>{activity.date}</p>
          <p>{activity.details}</p>
        </div>
      )}
    </div>
  );
};

export default activity;
