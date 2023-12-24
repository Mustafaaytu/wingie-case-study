import SignupForm from '@/components/SignupForm/SignupForm';
import {Container, Title} from '@/styles/sharedstyles';
import {RootState} from '@/redux/store';
import {useRouter} from 'next/router';
import React, { use, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Signup: React.FC = () => {
  const router = useRouter();

  const authSuccess = useSelector((state: RootState) => state.auth.success);

  useEffect(() => { 
    if (authSuccess) {
      router.push('/login');
    }
  }, [authSuccess]);


  return (
    <Container>
      <Title>Sign Up</Title>
      <SignupForm />
    </Container>
  );
};

export default Signup;
