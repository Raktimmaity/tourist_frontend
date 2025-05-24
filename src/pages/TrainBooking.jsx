import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaArrowLeft } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_4242424242424242"); // Stripe public key for testing

export default function TrainBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const train = location.state?.train;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    // Ensure Stripe and Elements are loaded
    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet, prevent payment attempt
    }

    if (paymentMethod === "card") {
      // Get the card element from Elements
      const cardElement = elements.getElement(CardElement);

      // Create PaymentMethod for card
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        alert("Payment failed: " + error.message);
        return;
      }

      // Call your backend to create a payment intent
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        alert("Payment failed: " + paymentIntent.error);
        return;
      }

      // Confirm the payment with the paymentIntent client secret
      const { error: confirmError, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmCardPayment(paymentIntent.clientSecret);

      if (confirmError) {
        alert("Payment failed: " + confirmError.message);
      } else if (confirmedPaymentIntent.status === "succeeded") {
        alert("Payment successful! Thank you for booking.");
        navigate("/"); // Redirect after successful payment
      }
    } else {
      // Handle other payment methods (UPI, QR code, etc.)
      alert("Payment successful! Thank you for booking.");
      navigate("/"); // Redirect after successful payment
    }
  };

  if (!train) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600 font-semibold">
          No train selected. Please go back and choose a train to book.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-28 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left: Train Details */}
        <div className="md:w-1/2 p-8 bg-indigo-50 border-r border-indigo-100 relative">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // or navigate('/trains')
            className="absolute top-4 left-4 text-indigo-700 hover:text-indigo-900 transition flex items-center space-x-2 cursor-pointer"
          >
            <FaArrowLeft />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">
            Train Details
          </h2>
          <ul className="space-y-3 bg-white p-4 rounded-lg">
            <li>
              <strong>Train Name:</strong> {train.name}
            </li>
            <li>
              <strong>Train Number:</strong> {train.number}
            </li>
            <li>
              <strong>Departure:</strong> {train.departure}
            </li>
            <li>
              <strong>Arrival:</strong> {train.arrival}
            </li>
            <li>
              <strong>Coach Type:</strong> {train.coach}
            </li>
          </ul>
        </div>

        {/* Right: Payment Form */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Payment
          </h1>

          {/* Payment Method Tabs */}
          <div className="flex justify-center mb-6 space-x-4">
            {["card", "upi", "qr"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-full font-medium border ${
                  paymentMethod === method
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-indigo-600 border-indigo-300"
                } transition`}
              >
                {method === "card"
                  ? "Card"
                  : method === "upi"
                  ? "UPI"
                  : "QR Code"}
              </button>
            ))}
          </div>

          {/* Payment Method Forms */}
          <form onSubmit={handlePayment} className="space-y-6">
            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <CardElement className="w-full px-4 py-2 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === "upi" && (
              <div>
                <input
                  type="text"
                  placeholder="Your UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            {/* QR Code Payment Form */}
            {paymentMethod === "qr" && (
              <div className="text-center">
                <p className="mb-4 text-gray-600">
                  Scan the QR code below to pay
                </p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@upi"
                  alt="QR Code"
                  className="mx-auto border rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-500">
                  UPI ID: yourupi@upi
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <TrainBooking />
    </Elements>
  );
}
