import Cookies from "js-cookie";

const isLoggedIn = () => {
  return Boolean(hasAccessToken());
};

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const clearTokens = () => {
  Cookies.remove("accessToken");
};

const addAccessToken = (token) => {
  Cookies.set("accessToken", token, { secure: true, expires: 1 });
};

export { getAccessToken, isLoggedIn, clearTokens, addAccessToken };
