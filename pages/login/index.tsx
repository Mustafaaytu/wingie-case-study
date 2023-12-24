import React, {use, useEffect} from 'react';
import {Container, Title} from '@/styles/sharedstyles';
import LoginForm from '@/components/LoginForm/LoginForm';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {RootState} from '@/redux/store';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    if (user) {
      router.push('/activities');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container>
      <Title>WINGIE</Title>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
