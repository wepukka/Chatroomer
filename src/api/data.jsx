import axios from "axios";
import { BACKEND_URL } from "../assets/constants";

export async function apiGetUserRooms(username) {
  try {
    const response = await axios.get(`${BACKEND_URL}/data/rooms/${username}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function apiUpdateUserRooms(username, rooms) {
  try {
    const response = await axios.post(`${BACKEND_URL}/data/rooms/add`, {
      user: username,
      rooms: rooms,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
