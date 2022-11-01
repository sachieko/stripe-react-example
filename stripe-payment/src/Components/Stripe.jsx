import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(`pk_test_51LktkjCljtP53Tab3fCX6fbLY8Rx81LjlBAdOKWpJQKsXwBLR1lulzEMNM2WYa3dSABXbbGQVt4S0yp3SSLQPSoI00cdhPGO1t`);

const Stripe = function() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Stripe;