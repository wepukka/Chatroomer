import("./Nav.css");
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clearTokens } from "../../session/session";
import LoadingCircle from "../LoadingCircle/LoadingCircle";

// Api
import { apiGetUserRooms, apiUpdateUserRooms } from "../../api/data";

// Child components //
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";
import Rooms from "./components/rooms/Rooms";
import Users from "./components/Users/Users";

const Nav = ({
  socket,
  username,
  room,
  setRoom,
  setIsOpenModal,
  setLoggedIn,
}) => {
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Current room users
  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  // add room to user db if its not already there //
  const addUserRoom = async (newRoom) => {
    let oldRooms = userRooms;
    const match = (oldRoom) => oldRoom === newRoom;

    if (oldRooms.some(match)) {
      return console.log("User already in this room");
    }

    oldRooms.push(room);
    let response = await apiUpdateUserRooms(username, oldRooms);

    if (response.success) {
      console.log("Room added to db");
    }
  };

  // Select rooms to delete //
  const selectRoomsToDelete = (roomId) => {
    const elem = document.getElementById(roomId);
    if (selectedRooms.includes(roomId)) {
      elem.style.backgroundColor = "#1784c4";
      setSelectedRooms((current) => current.filter((room) => room !== roomId));
    } else {
      elem.style.backgroundColor = "red";
      setSelectedRooms((oldArray) => [...oldArray, roomId]);
    }
  };

  // Delete rooms
  const handleRoomDelete = async () => {
    if (isDeleting && selectedRooms.length !== 0) {
      // New array where selected rooms are removed from user rooms
      let newRooms = userRooms.filter((room) => !selectedRooms.includes(room));

      setIsLoading(true);

      // Update rooms
      await apiUpdateUserRooms(username, newRooms);
      // Fetch updated rooms
      let response = await apiGetUserRooms(username);

      setUserRooms(response.payload.rooms);
      setSelectedRooms([]);

      setIsLoading(false);
    }
    setIsDeleting((prev) => !prev);
  };

  // Joins & leaves rooms
  const handleNav = () => {
    if (room !== "") {
      addUserRoom(room);
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  // Navigate when room changes //
  useEffect(() => {
    handleNav();
  }, [room]);

  // leave room
  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    setRoom("");
    setRoomUsers([]);
  };

  // Open modal
  const openModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  // Logout
  const logOut = () => {
    clearTokens();
    setLoggedIn(false);
  };

  // Get users rooms from backend
  const getUserRooms = async () => {
    let rooms = await apiGetUserRooms(username);

    return rooms.success === true
      ? setUserRooms(rooms.payload.rooms) & console.log("Rooms fetched")
      : console.log("Failed to fetch rooms data");
  };

  useEffect(() => {
    getUserRooms();
  }, []);

  return (
    <div className="nav small-caps">
      <h1 className="nav-username">{username}</h1>
      <CurrentRoom room={room} leaveRoom={leaveRoom} />
      <Users roomUsers={roomUsers} username={username} />
      {room === "" ? (
        <div className="nav-rooms-container">
          {isLoading && (
            <div className="nav-rooms-loading-wrapper">
              <LoadingCircle />
            </div>
          )}
          <Rooms
            userRooms={userRooms}
            setRoom={setRoom}
            isDeleting={isDeleting}
            selectedRooms={selectedRooms}
            selectRoomsToDelete={selectRoomsToDelete}
          />

          <div className="nav-rooms-actions">
            <button className="default-button" onClick={() => openModal()}>
              <p style={{ color: "black" }}>Join room</p>
            </button>
            <button
              className="default-button"
              onClick={() => handleRoomDelete()}
            >
              <p style={{ color: "black" }}>
                {isDeleting ? "Stop removing" : "Remove rooms"}
              </p>
            </button>
          </div>
        </div>
      ) : null}

      <button
        className="default-button log-out"
        onClick={() => {
          logOut();
        }}
      >
        <p style={{ color: "black" }}>Log Out</p>
      </button>
    </div>
  );
};

export default Nav;
