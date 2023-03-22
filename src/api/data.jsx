import axios from "axios";

const API_URL = "http://localhost:4000/api/data";

export async function apiGetUserRooms(username) {
  try {
    const response = await axios.get(`${API_URL}/rooms/${username}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function apiUpdateUserRooms(username, rooms) {
  try {
    const response = await axios.post(`${API_URL}/rooms/add`, {
      user: username,
      rooms: rooms,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
