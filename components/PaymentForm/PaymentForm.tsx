// components/PaymentForm.tsx
import React, {useMemo} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {AppDispatch} from '@/redux/store';
import {
  StyledForm,
  StyledInput,
  StyledErrorMessage,
  StyledButton,
} from '@/styles/sharedstyles';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {payment} from '@/redux/actions/reservation.actions';

const PaymentForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const {reservationId} = router.query;
  const currentYear = new Date().getFullYear();

  const paymentSchema = useMemo(
    () =>
      yup.object().shape({
        cardHolder: yup.string().required('Card Holder is required'),
        cardNumber: yup
          .string()
          .required('Card Number is required')
          .matches(/^\d{16}$/, 'Invalid card number'),
        expirationMonth: yup
          .string()
          .required('Expiration Month is required')
          .matches(/^(0?[1-9]|1[0-2])$/, 'Invalid month')
          .max(12, 'Month cannot be greater than 12'),
        expirationYear: yup
          .string()
          .required('Expiration Year is required')
          .matches(/^[0-9]{4}$/, 'Invalid year')
          .min(currentYear, 'Year cannot be in the past'),
        cvv: yup
          .string()
          .required('CVV is required')
          .matches(/^\d{3}$/, 'Invalid CVV'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formik = useFormik({
    initialValues: {
      cardHolder: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
    },
    validationSchema: paymentSchema,
    onSubmit: values => {
      const cleanedCardNumber = values.cardNumber.replace(/\s/g, '');
      const formattedExpirationDate = `${values.expirationMonth.padStart(
        2,
        '0'
      )}/${values.expirationYear}`;
      dispatch(
        payment({
          ...values,
          cardNumber: cleanedCardNumber,
          expirationDate: formattedExpirationDate,
          reservationId: reservationId as string,
          amount: Math.floor(Math.random() * 100),
        })
      );
    },
  });

  const formatCardNumber = (value: string): string => {
    let formattedValue = value.replace(/\s/g, '');
    if (formattedValue.length > 16) {
      formattedValue = formattedValue.slice(0, 16);
    }
    return formattedValue.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="cardHolder">Card Holder:</label>
        <StyledInput
          type="text"
          id="cardHolder"
          name="cardHolder"
          placeholder="John Doe"
          value={formik.values.cardHolder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cardHolder &&
          formik.errors.cardHolder &&
          formik.submitCount > 0 && (
            <StyledErrorMessage>{formik.errors.cardHolder}</StyledErrorMessage>
          )}
      </div>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <StyledInput
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formatCardNumber(formik.values.cardNumber)}
          onChange={e => {
            const cleanedValue = e.target.value.replace(/\s/g, '');
            formik.handleChange(e);
            formik.setFieldValue('cardNumber', cleanedValue);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.cardNumber &&
          formik.errors.cardNumber &&
          formik.submitCount > 0 && (
            <StyledErrorMessage>{formik.errors.cardNumber}</StyledErrorMessage>
          )}
      </div>
      <div>
        <label htmlFor="expirationMonth">Expiration Month:</label>
        <StyledInput
          type="text"
          id="expirationMonth"
          name="expirationMonth"
          placeholder="MM"
          value={formik.values.expirationMonth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={2}
        />
        {formik.touched.expirationMonth &&
          formik.errors.expirationMonth &&
          formik.submitCount > 0 && (
            <StyledErrorMessage>
              {formik.errors.expirationMonth}
            </StyledErrorMessage>
          )}
        <label htmlFor="expirationYear">Expiration Year:</label>
        <StyledInput
          type="text"
          id="expirationYear"
          name="expirationYear"
          placeholder="YYYY"
          value={formik.values.expirationYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={4}
        />
        {formik.touched.expirationYear &&
          formik.errors.expirationYear &&
          formik.submitCount > 0 && (
            <StyledErrorMessage>
              {formik.errors.expirationYear}
            </StyledErrorMessage>
          )}
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <StyledInput
          type="text"
          id="cvv"
          name="cvv"
          placeholder="---"
          value={formik.values.cvv}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={3}
        />
        {formik.touched.cvv && formik.errors.cvv && formik.submitCount > 0 && (
          <StyledErrorMessage>{formik.errors.cvv}</StyledErrorMessage>
        )}
      </div>
      <StyledButton type="submit">Submit Payment</StyledButton>
    </StyledForm>
  );
};

export default PaymentForm;
