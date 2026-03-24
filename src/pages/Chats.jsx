import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants/routes";

const Chats = () => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userData?._id) {
      navigate(APP_ROUTES.login);
    }
  }, [navigate, userData?._id]);

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-32 text-ink dark:bg-charcoal dark:text-cream">
      <div className="section-shell grid gap-10">
        <section className="overflow-hidden rounded-[36px] border border-sand-dark bg-[linear-gradient(130deg,#1A3530_0%,#2C4A3E_52%,#3D6B5A_100%)] px-8 py-10 shadow-luxury sm:px-12 sm:py-14">
          <span className="eyebrow-label">Chats</span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Conversations and support threads will live here.
          </h1>
        </section>

        <div className="surface-panel p-10 text-center dark:border-white/10 dark:bg-[#18211E]">
          <h2 className="text-3xl font-semibold text-forest dark:text-cream">No chats yet</h2>
          <p className="mt-4 text-sm text-slate dark:text-sand/70">
            Once direct traveler-guide messaging is connected, your active conversations will show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
