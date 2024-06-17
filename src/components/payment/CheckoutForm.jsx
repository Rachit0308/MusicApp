import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import CustomCard from "../common/CustomCard";
import "./CheckoutForm.css";
import { Alert } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ email, buyerId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = email;
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log(paymentIntent, "paymentIntent", error, "erro");
    if (paymentIntent?.status === "succeeded") {
      const response = await fetchData({
        url: "addbuyertransaction",
        method: "POST",
        data: {
          musicid: "07468e7d-9014-4282-b500-70cab9cc273b",
          buyerId: buyerId,
          response: "ous fufu uef eg ou ofoe",
          status: 1,
          amount: "80",
        },
      });
      if (response) {
        navigate("/success");
      }
    }
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      await fetchData({
        url: "addbuyertransaction",
        method: "POST",
        data: {
          musicid: "07468e7d-9014-4282-b500-70cab9cc273b",
          buyerId: buyerId,
          response: "ous fufu uef eg ou ofoe",
          status: 0,
          amount: "80",
        },
      });
      setMessage(error.message);
    } else {
      await fetchData({
        url: "addbuyertransaction",
        method: "POST",
        data: {
          musicid: "07468e7d-9014-4282-b500-70cab9cc273b",
          buyerId: buyerId,
          response: "ous fufu uef eg ou ofoe",
          status: 0,
          amount: "80",
        },
      });
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
