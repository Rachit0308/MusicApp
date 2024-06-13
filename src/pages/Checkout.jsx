// App.js

import CheckoutForm from "../components/payment/CheckoutForm";
import StripeProvider from "../components/payment/StripeProvider";

const Checkout = () => (
  <StripeProvider>
    <CheckoutForm />
  </StripeProvider>
);

export default Checkout;
