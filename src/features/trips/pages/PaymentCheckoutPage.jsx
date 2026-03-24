import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { FaTicketAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { HiOutlineCreditCard, HiOutlineShieldCheck } from "react-icons/hi2";
import axios from "axios";
import { API_ROUTES } from "../../../shared/config/api";
import { APP_STRINGS, TOAST_MESSAGES, UI_STRINGS } from "../../../shared/constants/strings";
import { APP_ROUTES } from "../../../shared/constants/routes";
import { createLogger } from "../../../shared/lib/logger";
import { toastService } from "../../../shared/services/toast";
import { formatCurrency } from "../../../shared/lib/format";
import { PAYMENT_PAGE_COPY } from "../constants/content";
import { BookTrip } from "../../../Apihandle/Trips";

const paymentLogger = createLogger("payment-page");

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [country, setCountry] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const { personDetails, totalCost, finalCost, tripData } = location.state || {
    personDetails: [],
    totalCost: 0,
    finalCost: 0,
    tripData: null,
  };

  const summaryItems = useMemo(
    () => [
      {
        label: PAYMENT_PAGE_COPY.totalCost,
        value: formatCurrency(totalCost),
      },
      {
        label: PAYMENT_PAGE_COPY.discountedCost,
        value: formatCurrency(finalCost),
        highlight: true,
      },
    ],
    [finalCost, totalCost]
  );

  const handlePayment = async () => {
    if (!userData?._id) {
      toastService.warning(TOAST_MESSAGES.signInRequired);
      navigate(APP_ROUTES.login);
      return;
    }

    if (!tripData?._id) {
      toastService.error("Trip details are missing for this payment.");
      navigate(APP_ROUTES.home);
      return;
    }

    if (!stripe || !elements || !nameOnCard || !country || !acceptedTerms) {
      toastService.warning("Complete all payment fields and accept the terms to continue.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(API_ROUTES.paymentIntent, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalCost * 100 }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        setErrorMessage(TOAST_MESSAGES.paymentIntentFailed);
        toastService.error(TOAST_MESSAGES.paymentIntentFailed);
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: nameOnCard,
            address: {
              country,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        toastService.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axios.post(BookTrip, {
          tripId: tripData._id,
          bookedBy: userData._id,
          personDetails,
          paymentIntentId: paymentIntent.id,
        });

        setShowSuccessPopup(true);
        toastService.success(TOAST_MESSAGES.tripBooked);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate(APP_ROUTES.myTrips);
        }, 3000);
      }
    } catch (error) {
      paymentLogger.error("Payment failed", error);
      setErrorMessage(TOAST_MESSAGES.paymentFailed);
      toastService.error(TOAST_MESSAGES.paymentFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-20 pt-28 text-ink dark:bg-charcoal dark:text-cream">
      <div className="section-shell">
        <section className="relative overflow-hidden rounded-[36px] border border-sand-dark bg-[linear-gradient(130deg,#1A3530_0%,#2C4A3E_52%,#3D6B5A_100%)] px-6 py-12 shadow-luxury sm:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,162,76,0.26),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(122,158,138,0.16),transparent_18%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <span className="eyebrow-label">{PAYMENT_PAGE_COPY.eyebrow}</span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-cream sm:text-5xl">
                {PAYMENT_PAGE_COPY.heading}
              </h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 text-cream backdrop-blur-md">
                <HiOutlineShieldCheck className="text-2xl text-gold" />
                <p className="mt-5 text-lg font-semibold">Protected checkout</p>
                <p className="mt-2 text-sm text-sand/70">Your payment details are handled through Stripe.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 text-cream backdrop-blur-md">
                <HiOutlineCreditCard className="text-2xl text-gold" />
                <p className="mt-5 text-lg font-semibold">Quick confirmation</p>
                <p className="mt-2 text-sm text-sand/70">After payment, you return directly to the main experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
                {PAYMENT_PAGE_COPY.summaryTitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-forest dark:text-cream">
                {PAYMENT_PAGE_COPY.travelerTitle}
              </h2>
            </div>

            <div className="space-y-3 border-b border-sand-dark pb-6 dark:border-white/10">
              {summaryItems.map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-mist">{label}</span>
                  <span className={`text-sm font-semibold ${highlight ? "text-forest dark:text-cream" : "text-slate dark:text-sand"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {personDetails.length > 0 ? (
                personDetails.map((person, index) => (
                  <div
                    key={`${person.name}-${index}`}
                    className="rounded-[24px] border border-sand-dark bg-sand/30 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sand">
                        <FaTicketAlt />
                      </div>
                      <div className="space-y-1 text-sm text-slate dark:text-sand/70">
                        <p><strong>{PAYMENT_PAGE_COPY.nameOnCard}:</strong> {person.name}</p>
                        <p><strong>Government ID:</strong> {person.govtId}</p>
                        <p><strong>Age:</strong> {person.age}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-mist">{PAYMENT_PAGE_COPY.noTravelers}</p>
              )}
            </div>

            <p className="mt-8 text-sm text-mist">
              {PAYMENT_PAGE_COPY.poweredBy} <span className="font-semibold text-forest dark:text-cream">{APP_STRINGS.brandName}</span>
            </p>
          </aside>

          <div className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
                Final step
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-forest dark:text-cream">
                {PAYMENT_PAGE_COPY.paymentTitle}
              </h2>
              {tripData ? (
                <p className="mt-3 text-sm text-slate dark:text-sand/70">
                  Booking for <span className="font-semibold text-forest dark:text-cream">{tripData.tripName}</span>
                </p>
              ) : null}
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate dark:text-sand">{PAYMENT_PAGE_COPY.nameOnCard}</span>
                <input
                  type="text"
                  id="name-on-card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="rounded-2xl border border-sand-dark bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-forest/40 dark:border-white/10 dark:bg-[#101714] dark:text-cream"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate dark:text-sand">{PAYMENT_PAGE_COPY.country}</span>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="rounded-2xl border border-sand-dark bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-forest/40 dark:border-white/10 dark:bg-[#101714] dark:text-cream"
                />
              </label>

              <div className="grid gap-2">
                <span className="text-sm font-medium text-slate dark:text-sand">{PAYMENT_PAGE_COPY.cardInfo}</span>
                <div className="rounded-[24px] border border-sand-dark bg-sand/30 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="rounded-2xl border border-sand-dark bg-white px-4 py-4 dark:border-white/10 dark:bg-[#101714]">
                    <CardElement
                      id="card-element"
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#32325d",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#fa755a",
                            iconColor: "#fa755a",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {errorMessage && <p className="text-sm text-terracotta">{errorMessage}</p>}

              <label className="inline-flex items-center gap-3 text-sm text-slate dark:text-sand/70">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-sand-dark text-forest"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                />
                <span>
                  {PAYMENT_PAGE_COPY.termsPrefix}{" "}
                  <a href="#" className="font-semibold text-forest underline underline-offset-4 dark:text-sand">
                    {UI_STRINGS.termsAndConditions}
                  </a>
                  .
                </span>
              </label>

              <button
                onClick={handlePayment}
                className="brand-button mt-2 w-full rounded-full py-4"
                disabled={loading}
              >
                {loading ? PAYMENT_PAGE_COPY.processing : PAYMENT_PAGE_COPY.proceed}
              </button>

              <p className="text-sm text-mist">
                {PAYMENT_PAGE_COPY.poweredBy} <span className="font-semibold text-forest dark:text-cream">Stripe</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm">
          <div className="surface-panel flex max-w-md flex-col items-center p-8 text-center dark:border-white/10 dark:bg-[#18211E]">
            <AiOutlineCheckCircle className="text-green-500" size={80} />
            <h2 className="mt-4 text-2xl font-bold text-forest dark:text-cream">
              {PAYMENT_PAGE_COPY.successTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate dark:text-sand/70">
              {PAYMENT_PAGE_COPY.successBody}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
