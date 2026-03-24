import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookedTripsByUser } from "../Apihandle/Trips";
import { APP_ROUTES } from "../shared/constants/routes";
import { formatCurrency, formatDate } from "../shared/lib/format";

const BookedTrips = () => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!userData?._id) {
      navigate(APP_ROUTES.login);
      return;
    }

    const loadBookings = async () => {
      const { data } = await axios.get(`${BookedTripsByUser}/${userData._id}`);
      setBookings(data.bookings || []);
    };

    loadBookings();
  }, [navigate, userData?._id]);

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-32 text-ink dark:bg-charcoal dark:text-cream">
      <div className="section-shell grid gap-10">
        <section className="overflow-hidden rounded-[36px] border border-sand-dark bg-[linear-gradient(130deg,#1A3530_0%,#2C4A3E_52%,#3D6B5A_100%)] px-8 py-10 shadow-luxury sm:px-12 sm:py-14">
          <span className="eyebrow-label">Trips booked</span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Every confirmed package you have already paid for.
          </h1>
        </section>

        {bookings.length === 0 ? (
          <div className="surface-panel p-10 text-center dark:border-white/10 dark:bg-[#18211E]">
            <h2 className="text-3xl font-semibold text-forest dark:text-cream">No trips booked yet</h2>
            <p className="mt-4 text-sm text-slate dark:text-sand/70">
              Once you complete payment for a trip, it will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="surface-panel grid gap-6 p-6 dark:border-white/10 dark:bg-[#18211E] lg:grid-cols-[0.32fr_0.68fr]"
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={booking.trip?.photos?.[0]}
                    alt={booking.trip?.tripName}
                    className="h-full min-h-[220px] w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
                        {booking.trip?.location}
                      </p>
                      <h2 className="mt-2 text-3xl font-semibold text-forest dark:text-cream">
                        {booking.trip?.tripName}
                      </h2>
                    </div>
                    <span className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-forest dark:bg-white/10 dark:text-sand">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl bg-sand/55 px-4 py-4 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.2em] text-mist dark:text-sand/50">Booking ref</p>
                      <p className="mt-2 text-sm font-medium text-forest dark:text-cream">{booking.bookingReference}</p>
                    </div>
                    <div className="rounded-2xl bg-sand/55 px-4 py-4 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.2em] text-mist dark:text-sand/50">Travellers</p>
                      <p className="mt-2 text-sm font-medium text-forest dark:text-cream">{booking.totalUnitsBooked}</p>
                    </div>
                    <div className="rounded-2xl bg-sand/55 px-4 py-4 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.2em] text-mist dark:text-sand/50">Paid</p>
                      <p className="mt-2 text-sm font-medium text-forest dark:text-cream">{formatCurrency(booking.totalPrice)}</p>
                    </div>
                    <div className="rounded-2xl bg-sand/55 px-4 py-4 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.2em] text-mist dark:text-sand/50">Start date</p>
                      <p className="mt-2 text-sm font-medium text-forest dark:text-cream">{formatDate(booking.trip?.startingDate)}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-sand-dark bg-sand/30 p-5 dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm font-semibold text-forest dark:text-cream">Booked travellers</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {booking.travellers.map((traveller, index) => (
                        <span
                          key={`${traveller.name}-${index}`}
                          className="rounded-full border border-forest/10 bg-white px-3 py-2 text-xs font-medium text-forest dark:border-white/10 dark:bg-white/10 dark:text-sand"
                        >
                          {traveller.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedTrips;
