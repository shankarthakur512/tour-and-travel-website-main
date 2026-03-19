import { API_ROUTES } from "../shared/config/api";

export const Host = API_ROUTES.sendMail.replace("/sendmail", "");

export const sendMail = API_ROUTES.sendMail;
