import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSuitcaseRolling, FaUserCircle } from "react-icons/fa";
import { HiOutlineIdentification, HiOutlineMapPin, HiOutlineUserGroup } from "react-icons/hi2";
import { APP_ROUTES } from "../shared/constants/routes";
import { BookedTripsByUser } from "../Apihandle/Trips";
import { getInitials } from "../shared/lib/format";

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const guideData = useSelector((state) => state.Guide.userData);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    if (!userData?._id) {
      navigate(APP_ROUTES.login);
      return;
    }

    const loadBookings = async () => {
      try {
        const { data } = await axios.get(`${BookedTripsByUser}/${userData._id}`);
        setBookingCount(data.bookings?.length || 0);
      } catch (error) {
        setBookingCount(0);
      }
    };

    loadBookings();
  }, [navigate, userData?._id]);

  if (!userData) {
    return null;
  }

  const stats = [
    { label: "Trips booked", value: bookingCount, icon: FaSuitcaseRolling },
    { label: "Guide profile", value: guideData ? "Active" : "Traveler", icon: HiOutlineUserGroup },
    { label: "Username", value: userData.username || "Not set", icon: HiOutlineIdentification },
  ];

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-32 text-ink dark:bg-charcoal dark:text-cream">
      <div className="section-shell grid gap-10">
        <section className="overflow-hidden rounded-[36px] border border-sand-dark bg-[linear-gradient(130deg,#1A3530_0%,#2C4A3E_52%,#3D6B5A_100%)] px-8 py-10 shadow-luxury sm:px-12 sm:py-14">
          <span className="eyebrow-label">My profile</span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Account details and travel activity in one place.
          </h1>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <div className="flex flex-col items-center text-center">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.fullname}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-sand"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3D6B5A,#2C4A3E)] text-3xl font-semibold text-sand">
                  {getInitials(userData.fullname)}
                </div>
              )}
              <h2 className="mt-5 text-3xl font-semibold text-forest dark:text-cream">
                {userData.fullname}
              </h2>
              <p className="mt-2 text-sm text-slate dark:text-sand/70">{userData.email}</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-sand-dark bg-sand/30 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3 text-sm font-semibold text-forest dark:text-sand">
                  <FaUserCircle />
                  Full name
                </div>
                <p className="mt-3 text-sm text-slate dark:text-sand/70">{userData.fullname}</p>
              </div>
              <div className="rounded-[24px] border border-sand-dark bg-sand/30 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3 text-sm font-semibold text-forest dark:text-sand">
                  <HiOutlineIdentification />
                  Username
                </div>
                <p className="mt-3 text-sm text-slate dark:text-sand/70">
                  {userData.username || "Not available"}
                </p>
              </div>
              <div className="rounded-[24px] border border-sand-dark bg-sand/30 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3 text-sm font-semibold text-forest dark:text-sand">
                  <HiOutlineMapPin />
                  Account type
                </div>
                <p className="mt-3 text-sm text-slate dark:text-sand/70">
                  {guideData ? "Traveler and guide" : "Traveler"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="surface-panel p-6 text-center dark:border-white/10 dark:bg-[#18211E]"
              >
                <Icon className="mx-auto text-4xl text-gold" />
                <h3 className="mt-5 text-3xl font-semibold text-forest dark:text-cream">
                  {value}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate dark:text-sand/72">{label}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
