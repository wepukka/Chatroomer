import axios from "axios";
import { addAccessToken, getAccessToken } from "../session/session";
const API_URL = "http://localhost:4000/api/auth";

export async function apiLogin(username, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      user: username,
      password: password,
    });

    if (response.data.success === true) {
      addAccessToken(response.data.payload.token);
      console.log("Access token added");
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function apiRegister(username, password) {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      user: username,
      password: password,
    });

    if (response.data.success === true) {
      addAccessToken(response.data.payload.token);
      console.log("Access token added");
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
      url: `${API_URL}/authenticate`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
