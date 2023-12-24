import Head from 'next/head'
import { Container, Main } from '@/styles/sharedstyles'
import Activities from './activities'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Wingie Case Study</title>
        <meta
          name="description"
          content="This site created for wingie case study"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Activities />
      </Main>
    </Container>
  )
}
