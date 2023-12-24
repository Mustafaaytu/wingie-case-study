import React, {useEffect, useMemo, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledInput,
  StyledErrorMessage,
  StyledButton,
} from '@/styles/sharedstyles';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {RootState} from '@/redux/store';
import {login} from '@/redux/actions/auth.actions';
import {useRouter} from 'next/router';

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [loginError, setLoginError] = useState<string | null>(null);
  const authError = useSelector((state: RootState) => state.auth.error);

  const loginSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .required('Email is required')
          .email('Invalid email address'),
        password: yup.string().required('Password is required'),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: ({email, password}) => {
      dispatch(login({email, password}));
    },
  });

  useEffect(() => {
    if (authError) {
      setLoginError('Please check your email and password and try again.');
    }
  }, [authError]);

  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit} style={{marginTop: '10px'}}>
        <div>
          <label htmlFor="email">Email:</label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <StyledErrorMessage>{formik.errors.email}</StyledErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <StyledErrorMessage>{formik.errors.password}</StyledErrorMessage>
          )}
        </div>
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
      {loginError && <StyledErrorMessage>{loginError}</StyledErrorMessage>}
    </>
  );
};

export default LoginForm;
