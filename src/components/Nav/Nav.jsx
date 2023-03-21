import("./Nav.css");
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clearTokens } from "../../session/session";
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

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  // Joins & leaves rooms
  const handleNav = () => {
    return room !== ""
      ? socket.emit("join_room", { username, room }) &&
          navigate("/chat", { replace: true })
      : navigate("/", { replace: true });
  };

  useEffect(() => {
    handleNav();
  }, [room]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    setRoom("");
    setRoomUsers([]);
  };

  const openModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const logOut = () => {
    clearTokens();
    setLoggedIn(false);
  };

  // TEST ROOMS  //
  const rooms = [
    {
      room: "js",
    },
    {
      room: "ts",
    },
    {
      room: "node",
    },
    {
      room: "express",
    },
    {
      room: "test",
    },
    {
      room: "test",
    },
    {
      room: "test",
    },
    {
      room: "test",
    },
    {
      room: "test",
    },
    {
      room: "test",
    },
  ];

  return (
    <div className="nav small-caps">
      <h1 className="nav-username">{username}</h1>
      <CurrentRoom room={room} leaveRoom={leaveRoom} />
      <Users roomUsers={roomUsers} username={username} />
      {room === "" ? (
        <div className="nav-rooms-container">
          <Rooms rooms={rooms} setRoom={setRoom} />
          <div className="nav-rooms-actions">
            <button className="default-button" onClick={() => openModal()}>
              <p style={{ color: "black" }}>Join room</p>
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
