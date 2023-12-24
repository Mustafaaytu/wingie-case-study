import {
  StyledButton,
  StyledErrorMessage,
  StyledForm,
  StyledInput,
} from '@/styles/sharedstyles';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import React, {useMemo} from 'react';
import * as yup from 'yup';
import {signup} from '@/redux/actions/auth.actions';

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signupSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
          .string()
          .email('Invalid email address')
          .required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      dispatch(signup(values));
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit} style={{marginTop: '10px'}}>
      <div>
        <label htmlFor="name">Name:</label>
        <StyledInput
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <StyledInput
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <StyledErrorMessage>{formik.errors.password}</StyledErrorMessage>
        )}
      </div>
      <StyledButton type="submit">Signup</StyledButton>
    </StyledForm>
  );
};

export default SignupForm;
