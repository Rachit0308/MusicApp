import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import CustomCard from "../common/CustomCard";
import "./CheckoutForm.css";
import { Alert } from "react-bootstrap";

export default function CheckoutForm({ email }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = email;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <CustomCard
      style={{
        width: "600px",
        height: "auto",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "20px",
      }}
    >
      <h3 className="d-flex justify-content-center align-items-center">
        Payment
      </h3>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          options={{ defaultValues: { email: userEmail } }}
        />
        <PaymentElement id="payment-element" />
        {message && (
          <Alert variant="danger" className="mt-3">
            {message}
          </Alert>
        )}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button disabled={isLoading || !stripe || !elements} id="submit">
            {isLoading ? "Processing..." : "Pay now"}
          </button>
        </div>

        {/* Show any error or success messages */}
      </form>
    </CustomCard>
  );
}
