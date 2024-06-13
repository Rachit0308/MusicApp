import { useEffect } from "react";
import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import useAxios from "../../hooks/useAxios";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

function Payment(props) {
  const { stripePromise } = props;
  const location = useLocation();
  const { email, clientSecret } = location.state;
  console.log(clientSecret, "clientSecret");
  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm email={email} />
        </Elements>
      )}
    </>
  );
}

Payment.propTypes = {
  stripePromise: PropTypes.string.isRequired,
};

export default Payment;
