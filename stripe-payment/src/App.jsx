import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./Components/CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = {};

export default function App() {

  useEffect(() => {
    stripePromise = loadStripe("pk_test_51LktkjCljtP53Tab3fCX6fbLY8Rx81LjlBAdOKWpJQKsXwBLR1lulzEMNM2WYa3dSABXbbGQVt4S0yp3SSLQPSoI00cdhPGO1t");
  }, []);

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}