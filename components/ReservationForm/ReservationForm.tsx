import React, {useMemo} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Reservation from '@/interfaces/reservation';
import {useRouter} from 'next/router';
import {
  StyledForm,
  StyledInput,
  StyledErrorMessage,
  StyledButton,
  StyledCancelButton,
} from '@/styles/sharedstyles';

interface ReservationFormProps {
  onReservationSubmit: (reservation: Reservation) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onReservationSubmit,
  onCancel,
}) => {
  const router = useRouter();

  const reservationSchema = useMemo(
    () =>
      yup
        .object()
        .shape({
          name: yup.string().required('Name is required'),
          email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
          numberOfPeople: yup
            .number()
            .integer('Number of people must be an integer')
            .min(1, 'Number of people must be at least 1')
            .required('Number of people is required'),
          phone: yup
            .string()
            .matches(
              /^\+(?:[0-9] ?){6,14}[0-9]$/,
              'Invalid phone number format'
            )
            .required('Phone Number is required'),
        })
        .strict(),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      numberOfPeople: 1,
    },
    validationSchema: reservationSchema,
    onSubmit: values => {
      onReservationSubmit(values);

      // Ödeme sayfasına yönlendirme
      router.push('/payment');
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <StyledInput
          type="text"
          id="name"
          name="name"
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
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <StyledErrorMessage>{formik.errors.email}</StyledErrorMessage>
        )}
      </div>
      <div>
        <label htmlFor="numberOfPeople">Number of People:</label>
        <StyledInput
          type="number"
          id="numberOfPeople"
          name="numberOfPeople"
          min="1"
          value={formik.values.numberOfPeople}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.numberOfPeople && formik.errors.numberOfPeople && (
          <StyledErrorMessage>
            {formik.errors.numberOfPeople}
          </StyledErrorMessage>
        )}
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <StyledInput
          type="tel"
          id="phone"
          name="phone"
          pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
          placeholder="Format: +90 (555) 555-5555"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <StyledErrorMessage>{formik.errors.phone}</StyledErrorMessage>
        )}
      </div>
      <StyledButton type="submit">Submit</StyledButton>
      <StyledCancelButton type="button" onClick={onCancel}>
        Cancel
      </StyledCancelButton>
    </StyledForm>
  );
};

export {ReservationForm};
