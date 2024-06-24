import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

function Payment(props) {
  const { stripePromise } = props;
  const location = useLocation();
  const { email, clientSecret, buyerId, musicId, price } = location.state;
  console.log(clientSecret, "clientSecret");
  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm price={price} musicId={musicId} email={email} buyerId={buyerId} />
        </Elements>
      )}
    </>
  );
}

Payment.propTypes = {
  stripePromise: PropTypes.string.isRequired,
};

export default Payment;
