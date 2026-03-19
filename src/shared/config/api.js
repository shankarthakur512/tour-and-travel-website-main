export const API_CONFIG = {
  baseUrl: "http://localhost:4001",
  apiPrefix: "/api/v1",
};

export const API_ROUTES = {
  users: `${API_CONFIG.baseUrl}${API_CONFIG.apiPrefix}/users`,
  guides: `${API_CONFIG.baseUrl}${API_CONFIG.apiPrefix}/Guide`,
  trips: `${API_CONFIG.baseUrl}${API_CONFIG.apiPrefix}/Trips`,
  sendMail: `${API_CONFIG.baseUrl}/sendmail`,
  paymentIntent: `${API_CONFIG.baseUrl}/create-payment-intent`,
};
