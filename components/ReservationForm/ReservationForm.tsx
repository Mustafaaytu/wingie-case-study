import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Reservation from '@/interfaces/reservation'
import { useRouter } from 'next/router'
import {
  StyledForm,
  StyledInput,
  StyledErrorMessage,
  StyledButton,
  StyledCancelButton,
} from '@/styles/sharedstyles'

interface ReservationFormProps {
  onReservationSubmit: (reservation: Reservation) => void
  onCancel: () => void
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onReservationSubmit,
  onCancel,
}) => {
  const router = useRouter()

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
          birthDate: yup
            .mixed()
            .test(
              'age',
              'Reservations cannot be made for participants under the age of 18.',
              (value) => {
                const isDate = yup.date().isValidSync(value)
                if (!isDate) {
                  return false
                }

                const birthDate = new Date(value ?? '')
                const today = new Date()
                const age = today.getFullYear() - birthDate.getFullYear()
                return age >= 18
              },
            )
            .required('Birth Date is required'),
          phone: yup
            .string()
            .matches(
              /^\+(?:[0-9] ?){6,14}[0-9]$/,
              'Invalid phone number format',
            )
            .required('Phone Number is required'),
        })
        .strict(),
    [],
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      birthDate: '',
      phone: '',
    },
    validationSchema: reservationSchema,
    onSubmit: (values) => {
      onReservationSubmit(values)

      // Ödeme sayfasına yönlendirme
      router.push('/payment')
    },
  })

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
        <label htmlFor="birthDate">Birth Date:</label>
        <StyledInput
          type="date"
          id="birthDate"
          name="birthDate"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.values.birthDate && formik.errors.birthDate && (
          <StyledErrorMessage>{formik.errors.birthDate}</StyledErrorMessage>
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
  )
}

export { ReservationForm }
