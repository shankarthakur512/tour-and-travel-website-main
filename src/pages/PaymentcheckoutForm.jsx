import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaTicketAlt } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nameOnCard, setNameOnCard] = useState('');
  const [country, setCountry] = useState('');

  const { personDetails, totalCost, finalCost } = location.state || {
    personDetails: [],
    totalCost: 0,
    finalCost: 0,
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !nameOnCard || !country) return;

    setLoading(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(`/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalCost * 100 }), // Amount in cents
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        setErrorMessage('Unable to process payment.');
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            address: {
              country: country,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate('/trips');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 lg:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        
        <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white p-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-600">
            Booking Summary
          </h2>

          <div className="border-b pb-4 mb-4">
            <p className="text-sm lg:text-base">
              Total Cost: <span className="line-through">${totalCost}</span>
            </p>
            <p className="text-sm lg:text-base text-green-500">
              Final Cost (after 10% discount): ${finalCost}
            </p>
          </div>

          
          <div className="mb-4 lg:mb-6 overflow-y-auto max-h-60 lg:max-h-80">
            <h3 className="text-xl font-semibold mb-3">Travellers</h3>
            {personDetails.length > 0 ? (
              personDetails.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
                >
                  <FaTicketAlt className="text-primary mr-4" size={20} />
                  <div>
                    <p className="text-sm lg:text-base">
                      <strong>Name:</strong> {person.name}
                    </p>
                    <p className="text-sm lg:text-base">
                      <strong>Government ID:</strong> {person.govtId}
                    </p>
                    <p className="text-sm lg:text-base">
                      <strong>Age:</strong> {person.age}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No travellers added yet.</p>
            )}
          </div>

          
          <div className="text-center mt-4 lg:mt-6 text-sm text-gray-400">
            Powered by <span className="text-blue-500">Travellgo</span>
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white p-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600">
            Payment Details
          </h2>

         
          <div className="mb-4">
            <label htmlFor="name-on-card" className="text-sm lg:text-base font-medium mb-1 lg:mb-2 block">
              Name on Card:
            </label>
            <input
              type="text"
              id="name-on-card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="p-2 lg:p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

         
          <div className="mb-4">
            <label htmlFor="country" className="text-sm lg:text-base font-medium mb-1 lg:mb-2 block">
              Country:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2 lg:p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

         
          <div className="mb-4">
            <label htmlFor="card-element" className="text-sm lg:text-base font-medium mb-1 lg:mb-2 block">
              Enter your card information:
            </label>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 p-4 lg:p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
              <CardElement
                id="card-element"
                className="p-2 lg:p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#32325d',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#fa755a',
                      iconColor: '#fa755a',
                    },
                  },
                }}
              />
            </div>
          </div>

          
          {errorMessage && <p className="text-red-500 text-sm lg:text-base">{errorMessage}</p>}

          
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-sm lg:text-base text-gray-700 dark:text-gray-400">
                I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a>.
              </span>
            </label>
          </div>

         
          <button
            onClick={handlePayment}
            className="w-full py-2 lg:py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>

         
          <div className="text-center mt-4 text-sm lg:text-base text-gray-400">
            Powered by <span className="text-blue-500">Stripe</span>
          </div>
        </div>
      </div>

      
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <AiOutlineCheckCircle className="text-green-500" size={80} />
            <h2 className="text-2xl font-bold mt-4">Booking Confirmed!</h2>
            <p className="mt-2">Thank you for your payment. Your trip is confirmed!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
