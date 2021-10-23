/** @format */
const dev = process.env.NODE_ENV !== "production";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export const TOP_BAR_URL = "/api/top-bar-msgs";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
