import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const PaymentForm = function() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded, disable for submission until it has loaded
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Should be payment completion page get
        return_url: "http://localhost:3000",
      }
    });

    // This will only be reached if there is an error, otherwise the promise above will send them to the above URL.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    }
    setMessage('An unexpected error occurred. Great..');

    setIsLoading(false);
  };

  return (
    <>
    <form id='payment-form' onSubmit={handleSubmit}>
     <PaymentElement id='payment-element' />
     <button disabled={isLoading || !stripe || !elements} id='submit'>
      <span>{isLoading ? 'Processing. . .' : 'Pay Now'}</span> 
     </button>
     {message && <span id='payment-message'>{message}</span>}
    </form>
    </>
  );
};

export default PaymentForm;