import axios from "axios";
import { addAccessToken } from "../session/session";
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
