import axios from "axios";
import { addAccessToken, getAccessToken } from "../session/session";
import { BACKEND_URL } from "../assets/constants";

export async function apiLogin(username, password) {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      user: username,
      password: password,
    });

    if (response.data.success === true) {
      addAccessToken(response.data.payload.token);
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function apiRegister(username, password) {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, {
      user: username,
      password: password,
    });

    if (response.data.success === true) {
      addAccessToken(response.data.payload.token);
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function authenticate() {
  try {
    const token = getAccessToken();

    const response = await axios({
      method: "post",
      url: `${BACKEND_URL}/auth/authenticate`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
