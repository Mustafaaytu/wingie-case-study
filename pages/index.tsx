import Head from 'next/head';
import {Container} from '@/styles/sharedstyles';
import Navigation from '@/components/Navigation/Navigation';

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
      <Navigation />
    </Container>
  );
}
