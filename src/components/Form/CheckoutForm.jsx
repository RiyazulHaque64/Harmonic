import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const CheckoutForm = ({ closeModal, singleClassInfo }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (singleClassInfo.price) {
      axios
        .post(`${import.meta.env.VITE_SERVER_BASE_URL}/create-payment-intent`, {
          payingAmount: singleClassInfo.price,
        })
        .then((data) => {
          setClientSecret(data.data.clientSecret);
          console.log(data.data.clientSecret);
        });
    }
  }, [singleClassInfo]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    // .then(function (result) {
    //   // Handle result.error or result.paymentIntent
    // });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          ...singleClassInfo,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        axios
          .post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/enrolledClass`,
            paymentInfo
          )
          .then((res) => console.log(res.data));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-600 duration-200 px-6 py-1 rounded text-white font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe}
            className="bg-blue-500 hover:bg-blue-600 duration-200 px-6 py-1 rounded text-white font-semibold"
          >
            Pay ${singleClassInfo.price}
          </button>
        </div>
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};
export default CheckoutForm;
