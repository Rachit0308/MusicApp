import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomCard from "../common/CustomCard";
import PaymentSuccess from "../../assets/images/payment-success-v2.png";

function Completion(props) {
  const [messageBody, setMessageBody] = useState("");
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      const { error } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(
        error ? (
          `${error.message}`
        ) : (
          <>
            <div>
              <img src={PaymentSuccess} alt="payment-success" />
            </div>
            <h3>Purchase Successful!</h3>
          </>
          // <>
          //   &gt; Payment {paymentIntent.status}:{" "}
          //   <a
          //     href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
          //     target="_blank"
          //     rel="noreferrer"
          //   >
          //     {paymentIntent.id}
          //   </a>
          // </>
        )
      );
    });
  }, [stripePromise]);

  return (
    <>
      <CustomCard
        isImage={false}
        className="pb-4"
        style={{
          display: "flex",
          alignItems: "center",
          height: "auto",
          width: "500px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {messageBody}
      </CustomCard>
      {/* <h1>Thank you!</h1>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: "block" } : {}}
      >
        {messageBody}
      </div> */}
    </>
  );
}

Completion.propTypes = {
  stripePromise: PropTypes.string.isRequired,
};

export default Completion;
