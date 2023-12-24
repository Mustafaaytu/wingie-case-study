import Loading from '@/components/Loading/Loading'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Title } from '@/styles/sharedstyles'
import PaymentForm, {
  PaymentFormValues,
} from '@/components/PaymentForm/PaymentForm'
import withAuth from '@/components/WithAuth/WithAuth'

const PaymentPage: React.FC = () => {
  const router = useRouter()
  const { reservationId } = router.query
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false)

      if (!reservationId) {
        router.push('/activities')
      }
    }
  }, [reservationId, router.isReady, router])

  const handlePaymentSubmit = (values: PaymentFormValues) => {
    alert('Ödeme başarıyla gerçekleşti!')
    console.log(values)
    // Simülasyon sonrası aktiviteler sayfasına yönlendirme
    router.push('/activities')
  }

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Title>Payment</Title>
          {reservationId && <p>Reservation ID: {reservationId}</p>}
          <PaymentForm onSubmit={handlePaymentSubmit} />
        </>
      )}
    </Container>
  )
}

export default withAuth(PaymentPage)
