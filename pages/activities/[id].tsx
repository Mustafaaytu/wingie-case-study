import {Container, Title} from '@/styles/sharedstyles';
import {ReservationForm} from '@/components/ReservationForm/ReservationForm';
import {Activity} from '@/interfaces/activity';
import {Reservation} from '@/interfaces/reservation';
import {fetchActivity} from '@/redux/actions/activity.actions';
import {AppDispatch, RootState, useAppDispatch} from '@/redux/store';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import withAuth from '@/components/WithAuth/WithAuth';

import {clearReservation} from '@/redux/reducers/reservation.reducer';

const Activity = () => {
  const [remainingTime, setRemainingTime] = useState(900);
  const [redirectTimer, setRedirectTimer] = useState(3);
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
    const interval = setInterval(() => {
      setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime === 0 && redirectTimer > 0) {
      const timerInterval = setInterval(() => {
        setRedirectTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (remainingTime === 0 && redirectTimer === 0) {
      dispatch(clearReservation());
      router.push('/activities');
    }
  }, [remainingTime, redirectTimer, dispatch, router]);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivity(String(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (reservation) {
      dispatch(clearReservation());
      router.push('/payment?reservationId=' + reservation.id);
    }
  }, [reservation, dispatch, router]);

  const handleBackToActivities = () => {
    router.push('/activities');
  };

  if (remainingTime === 0) {
    return (
      <Container>
        <Title>Reservation</Title>
        {redirectTimer > 0 && (
          <p>
            Your reservation period has expired! Redirecting in {redirectTimer}
            ...
          </p>
        )}
      </Container>
    );
  }

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
