import {Container, Title} from '@/styles/sharedstyles';
import {ReservationForm} from '@/components/ReservationForm/ReservationForm';
import {Activity} from '@/interfaces/activity';
import {Reservation} from '@/interfaces/reservation';
import {fetchActivity} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/router';
import {use, useEffect} from 'react';
import {useSelector} from 'react-redux';
import withAuth from '@/components/WithAuth/WithAuth';
import {clear} from 'console';
import {clearReservation} from '@/redux/reducers/reservation.reducer';

const Activity = () => {
  const router = useRouter();
  const {id} = router.query;
  const dispatch: AppDispatch = useAppDispatch();
  const activity: Activity | undefined = useSelector(
    (state: RootState) => state.activities.activity
  );
  const loading = useSelector((state: RootState) => state.activities.loading);
  const error = useSelector((state: RootState) => state.activities.error);
  const reservation: Reservation | undefined = useSelector(
    (state: RootState) => state.reservation.reservation
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchActivity(String(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (reservation) {
      dispatch(clearReservation());
      router.push('/payment?reservationId=' + reservation.id);
    }
  }, [reservation]);

  const handleBackToActivities = () => {
    router.push('/activities');
  };

  return (
    <Container>
      <Title>Reservation</Title>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {activity && (
        <div style={{justifyContent: 'center'}}>
          <p style={{textAlign: 'center', fontWeight: 700}}>{activity.name}</p>
          <p>{activity.description}</p>
        </div>
      )}

      <ReservationForm onCancel={handleBackToActivities} />
    </Container>
  );
};

export default withAuth(Activity);
