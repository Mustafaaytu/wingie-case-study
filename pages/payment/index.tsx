import Loading from '@/components/Loading/Loading';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Container, Title} from '@/styles/sharedstyles';
import {AppDispatch} from '@/redux/store';
import {RootState} from '@/redux/store';
import PaymentForm from '@/components/PaymentForm/PaymentForm';
import withAuth from '@/components/WithAuth/WithAuth';
import {useDispatch, useSelector} from 'react-redux';
import {clearPayment} from '@/redux/reducers/reservation.reducer';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const {reservationId} = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const isPaymentSuccessful = useSelector(
    (state: RootState) => state.reservation.paymentSuccess
  );

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);

      if (!reservationId) {
        router.push('/activities');
      }
    }
  }, [reservationId, router.isReady, router]);

  useEffect(() => {
    if (isPaymentSuccessful) {
      setShowPaymentSuccess(true);

      // Timer to redirect after 3 seconds
      const redirectTimer = setTimeout(() => {
        dispatch(clearPayment());
        setShowPaymentSuccess(false);
        router.push('/activities');
      }, 3000);

      // Clear timer on component unmount
      return () => clearTimeout(redirectTimer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaymentSuccessful]);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Title>Payment</Title>
          {reservationId && <p>Reservation ID: {reservationId}</p>}
          {showPaymentSuccess ? (
            <div style={{color: 'green', marginBottom: '10px'}}>
              Payment Successful! Redirecting to Activities page...
            </div>
          ) : (
            <PaymentForm />
          )}
        </>
      )}
    </Container>
  );
};

export default withAuth(PaymentPage);
