import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../Redux/authslice";
import { removeGuide } from "../../Redux/GuideSlice";
import { persistor } from "../../Redux/store";
import { APP_ROUTES } from "../../shared/constants/routes";
import { NAV_STRINGS } from "../../shared/constants/strings";

const UserMenu = () => {
  const dispatch = useDispatch();
  const guideData = useSelector((state) => state.Guide.userData);

  const menuLinks = [
    { label: NAV_STRINGS.home, to: APP_ROUTES.home },
    {
      label: guideData ? NAV_STRINGS.guideDashboard : NAV_STRINGS.becomeGuide,
      to: APP_ROUTES.dashboard,
    },
    ...(guideData ? [{ label: NAV_STRINGS.createPackage, to: APP_ROUTES.tourPackage }] : []),
    { label: NAV_STRINGS.blogs, to: APP_ROUTES.blogs },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeGuide());
    persistor.purge();
  };

  return (
    <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-sand-dark bg-warm-white p-2 shadow-soft dark:border-white/10 dark:bg-[#102520]">
      <div className="py-1">
        {menuLinks.map((link) => (
          <Link
            key={link.to + link.label}
            to={link.to}
            className="block rounded-2xl px-4 py-3 text-sm text-slate transition hover:bg-sand hover:text-forest dark:text-sand/70 dark:hover:bg-white/10 dark:hover:text-cream"
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-1 block w-full rounded-2xl border border-sand-dark px-4 py-3 text-left text-sm text-terracotta transition hover:bg-sand dark:border-white/10 dark:hover:bg-white/10"
        >
          {NAV_STRINGS.logout}
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
