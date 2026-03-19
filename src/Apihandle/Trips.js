import { API_ROUTES } from "../shared/config/api";

const host = API_ROUTES.trips;

export const RegisterTour = `${host}/register-trip`;
export const FindTripsByLocalGuide = `${host}/trips`;
export const FindTripsByLocation = `${host}/find-trips`;
export const FindtripDetail = `${host}/find-trip`;
