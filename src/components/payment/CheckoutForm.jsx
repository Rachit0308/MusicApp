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
import PropTypes from "prop-types";
function CheckoutForm({ email, buyerId, musicId, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = email;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion/${buyerId}/${musicId}/${price}`
      },
    });
    console.log(error, "error");
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

CheckoutForm.propTypes = {
  price: PropTypes.number.isRequired,
  musicId: PropTypes.string.isRequired,
  buyerId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default CheckoutForm
