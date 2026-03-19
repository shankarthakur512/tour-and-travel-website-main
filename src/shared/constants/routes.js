export const APP_ROUTES = {
  home: "/",
  about: "/about",
  blogs: "/blogs",
  localGuide: "/local-guide",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  search: "/search",
  payment: "/payment",
  tourPackage: "/tourPackage",
};

export const getGuideDetailsRoute = (guideId) => `${APP_ROUTES.search}/${guideId}`;

export const getTripDetailsRoute = (tripId) => `${APP_ROUTES.search}/tour/${tripId}`;
