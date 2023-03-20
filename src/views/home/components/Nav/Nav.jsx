import("./Nav.css");
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ socket, username, setUsername, room, setRoom }) => {
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  // Join &
  const joinRoom = () => {
    return room !== ""
      ? socket.emit("join_room", { username, room }) &&
          navigate("/chat", { replace: true })
      : navigate("/", { replace: true });
  };

  useEffect(() => {
    joinRoom();
  }, [room]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    setRoom("");
    setRoomUsers([]);
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
      room: "express",
    },
    {
      room: "express",
    },
    {
      room: "express",
    },
    {
      room: "express",
    },
    {
      room: "express",
    },
    {
      room: "express",
    },
  ];

  return (
    <div className="nav small-caps">
      <input
        className="home-input"
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <h1 className="nav-username">{username}</h1>
      {room !== "" ? (
        <div className="nav-room-wrapper">
          <div className="nav-room">
            <p>Current room:</p>
            <h2 className="roomTitle ">{room}</h2>
          </div>
          <button className="default-button" onClick={leaveRoom}>
            Leave
          </button>
        </div>
      ) : (
        <></>
      )}

      <div>
        {roomUsers.length > 0 && <h3 className="usersTitle">Users:</h3>}
        <ul className="usersList">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              <p>{user.username}</p>
            </li>
          ))}
        </ul>
      </div>
      {room === "" ? (
        <div className="nav-rooms">
          <p className="nav-rooms-title">Your rooms</p>
          <div className="nav-select-room-wrapper">
            {rooms.map((room, index) => (
              <div
                key={index}
                id={room.room}
                className="nav-select-room-join"
                onClick={(e) => setRoom(e.target.id)}
              >
                {room.room}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <button className="default-button log-out">
        <p style={{ color: "black" }}>Log Out (No func)</p>
      </button>
    </div>
  );
};

export default Nav;
