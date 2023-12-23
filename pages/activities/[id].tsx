import {Container, Title} from '@/styles/sharedstyles';
import {ReservationForm} from '@/components/ReservationForm/ReservationForm';
import {Activity} from '@/interfaces/activity';
import Reservation from '@/interfaces/reservation';
import {fetchActivity} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
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

  const handleReservationSubmit = (reservation: Reservation) => {
    router.push('/payment');
  };

  const handleBackToActivities = () => {
    router.push('/activities');
  };

  return (
    <Container>
      <Title>Reservation</Title>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {activity && (
        <div>
          <p>{activity.details}</p>
        </div>
      )}

      <ReservationForm
        onReservationSubmit={handleReservationSubmit}
        onCancel={handleBackToActivities}
      />
    </Container>
  );
};

export default activity;
