import Cookies from "js-cookie";

const isLoggedIn = () => {
  return Boolean(hasAccessToken());
};

const hasAccessToken = () => {
  return Cookies.get("accessToken");
};

const clearTokens = () => {
  Cookies.remove("accessToken");
};

const addAccessToken = (token) => {
  Cookies.set("accessToken", token, { secure: true, expires: 1 });
};

export { hasAccessToken, isLoggedIn, clearTokens, addAccessToken };
