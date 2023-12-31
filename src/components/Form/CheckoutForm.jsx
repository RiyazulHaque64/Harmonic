import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { updateClass } from "../../API/class";
import Swal from "sweetalert2";
import { deleteSelectedClasses } from "../../API/select";
import moment from "moment/moment";
import { ImSpinner9 } from "react-icons/im";

const CheckoutForm = ({ closeModal, singleClassInfo, refetch }) => {
  const [loading, setLoading] = useState(false);
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
        });
    }
  }, [singleClassInfo]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // paymentMethod
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setLoading(false);
    }
    // else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }
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

    if (confirmError) {
      setCardError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          ...singleClassInfo,
          transactionId: paymentIntent.id,
          date: new Date().getTime(),
          visibleDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };
        axios
          .post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/enrolledClass`,
            paymentInfo
          )
          .then((res) => {
            if (res.data.insertedId) {
              axios
                .get(
                  `${import.meta.env.VITE_SERVER_BASE_URL}/enrolledClass/${
                    singleClassInfo.classId
                  }`
                )
                .then((data) => {
                  console.log(data);
                  const updateClassInfo = {
                    seats: data.data.seats - 1,
                    enrolledStudent: data.data.enrolledStudent + 1,
                  };
                  console.log(updateClassInfo);
                  updateClass(updateClassInfo, singleClassInfo.classId).then(
                    (res) => {
                      console.log(res.data);
                      deleteSelectedClasses(singleClassInfo._id).then(
                        (data) => {
                          console.log(data.data);
                          if (data.data.deletedCount > 0) {
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title:
                                "You have successfully enrolled in this class",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            setLoading(false);
                            refetch();
                          }
                        }
                      );

                      closeModal();
                    }
                  );
                });
            }
          });
      }
      setLoading(false);
    }
    setLoading(false);
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
        <p className="text-red-500 mb-6">{cardError}</p>
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
            disabled={!stripe || loading}
            className="bg-blue-500 hover:bg-blue-600 duration-200 px-6 py-1 rounded text-white font-semibold"
          >
            {loading ? (
              <ImSpinner9 className="m-auto animate-spin w-6 h-6" />
            ) : (
              `Pay ${singleClassInfo.price}`
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default CheckoutForm;
