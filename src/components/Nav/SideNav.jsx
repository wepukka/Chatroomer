import("./SideNav.css");
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clearTokens } from "../../session/session";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import MenuIcon from "@mui/icons-material/Menu";

// Api
import { apiGetUserRooms, apiUpdateUserRooms } from "../../api/data";

// Child components //
import CurrentRoom from "./components/CurrentRoom/CurrentRoom";
import Rooms from "./components/Rooms/Rooms";
import Users from "./components/Users/Users";

const SideNav = ({
  socket,
  username,
  room,
  setRoom,
  setIsOpenModal,
  setLoggedIn,
  sideNavIsExpanded,
  setSideNavIsExpanded,
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

  // Delete rooms
  const handleRoomDelete = async () => {
    if (userRooms.length === 0) {
      return alert("No rooms to remove.");
    }

    if (isDeleting && selectedRooms.length !== 0) {
      // New array where selected rooms are removed from user rooms
      let newRooms = userRooms.filter((room) => !selectedRooms.includes(room));

      setIsLoading(true);

      // Update rooms
      await apiUpdateUserRooms(username, newRooms);
      // Fetch updated rooms
      let response = await apiGetUserRooms(username);
      console.log(response.payload.rooms);

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
      setSideNavIsExpanded(false);
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
    <div
      className={`side-nav small-caps ${
        sideNavIsExpanded ? "side-nav-expanded" : ""
      }`}
    >
      <button
        className="toggle-nav"
        onClick={() => {
          setSideNavIsExpanded((prev) => !prev);
        }}
      >
        <MenuIcon className="side-nav-icon" />
      </button>
      <h1 className="side-nav-username">{username}</h1>
      <CurrentRoom room={room} leaveRoom={leaveRoom} />
      <Users roomUsers={roomUsers} username={username} />
      {room === "" ? (
        <div className="side-nav-rooms-container">
          {isLoading && (
            <div className="side-nav-rooms-loading-wrapper">
              <LoadingCircle />
            </div>
          )}
          <Rooms
            userRooms={userRooms}
            setRoom={setRoom}
            isDeleting={isDeleting}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />

          <div className="side-nav-rooms-actions">
            <button
              id="join-room-button"
              className="default-button"
              onClick={() => openModal()}
            >
              <p>Join rooms</p>
            </button>
            <button
              id="delete-room-button"
              className="default-button"
              onClick={() => handleRoomDelete()}
            >
              <p>{isDeleting ? "Stop removing" : "Remove rooms"}</p>
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
        <p>Log Out</p>
      </button>
    </div>
  );
};

export default SideNav;
