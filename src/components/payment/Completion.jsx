import PropTypes from "prop-types";
import CustomCard from "../common/CustomCard";
import PaymentSuccess from "../../assets/images/payment-success-v2.png";
import PaymentFailed from "../../assets/images/payment-fail.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

function Completion(props) {
  const { fetchData } = useAxios();
  const [messageBody, setMessageBody] = useState("");
  const { stripePromise } = props;
  const params = useParams();
  const { buyerId, musicId, amount } = params;

  useEffect(() => {
    if (!stripePromise) return;
    const isTip = !!parseInt(localStorage.getItem('isTip')); // Convert to boolean
   console.log('====================================');
   console.log(isTip);
   console.log('====================================');
   
    const finalMusicId = isTip ? "" : musicId;
    const userId = isTip ? musicId : "";

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get("payment_intent_client_secret");
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      console.log(paymentIntent, "paymentIntent");

      if (error) {
        await fetchData({
          url: "addbuyertransaction",
          method: "POST",
          data: {
            musicId: finalMusicId,
            buyerId: buyerId,
            response: error?.message,
            status: 0,
            amount: amount,
            userId: userId,
            isTip: isTip ? 1 : 0,
          },
        });
      } else if (paymentIntent.status === "succeeded") {
        await fetchData({
          url: "addbuyertransaction",
          method: "POST",
          data: {
            musicId: finalMusicId,
            buyerId: buyerId,
            response: paymentIntent.status,
            status: 1,
            amount: amount,
            userId: userId,
            isTip: isTip ? 1 : 0,
          },
        });
      } else {
        await fetchData({
          url: "addbuyertransaction",
          method: "POST",
          data: {
            musicId: finalMusicId,
            buyerId: buyerId,
            response: paymentIntent.status,
            status: 0,
            amount: amount,
            userId: userId,
            isTip: isTip ? 1 : 0,
          },
        });
      }

      setMessageBody(
        error ? (
          <>
            <div>
              <img src={PaymentFailed} alt="payment-failed" />
            </div>
            <h3>Purchase Failed!</h3>
          </>
        ) : paymentIntent.status === "succeeded" ? (
          <>
            <div>
              <img src={PaymentSuccess} alt="payment-success" />
            </div>
            <h3>Purchase Successful!</h3>
            {!isTip && <a href={localStorage.getItem("fileUrl")}>Download File</a>}
          </>
        ) : (
          <>
            <div>
              <img height={225} width={225} src={PaymentFailed} alt="payment-failed" />
            </div>
            <h3>Purchase Failed!</h3>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
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
  );
}

Completion.propTypes = {
  stripePromise: PropTypes.string.isRequired,
};

export default Completion;
