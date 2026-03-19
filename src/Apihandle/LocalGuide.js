import { API_ROUTES } from "../shared/config/api";

const host = API_ROUTES.guides;

export const registerGuide = `${host}/register-guide`;
export const findGuideByUserId = `${host}/find-guide`;
export const findGuideByCity = `${host}/find-guideByCity`;
export const findGuide = `${host}/find-guide`;
