// StripeProvider.js
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

const stripePromise = loadStripe(
  "pk_test_51PBJHR2M3iXRRKjE33wLv50Lomq2gyzlduoYY6vWn4KsNOT0wBNHmgqqxuQlVwgDObfVtu1O43MhgsYPoa9oz2Sa00ZewDNnHd"
);

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

StripeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StripeProvider;
