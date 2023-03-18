import("./Nav.css");
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ socket, username, room, setRoom }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    setRoom("");
    setRoomUsers([]);
    navigate("/", { replace: true });
  };

  return (
    <div className="nav small-caps">
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
      <button className="default-button log-out">
        <p style={{ color: "black" }}>Log Out (No func)</p>
      </button>
    </div>
  );
};

export default Nav;
