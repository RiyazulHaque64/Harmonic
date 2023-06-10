import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

const CheckoutForm = ({ closeModal, payingAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
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
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
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
          Pay ${payingAmount}
        </button>
      </div>
    </form>
  );
};
export default CheckoutForm;
