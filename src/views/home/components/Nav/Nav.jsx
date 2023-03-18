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
    <div className="nav">
      <h1 className="username">{username}</h1>
      <h2 className="roomTitle">{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className="usersTitle">Users:</h5>}
        <ul className="usersList">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {room !== "" ? (
        <button className="btn btn-outline" onClick={leaveRoom}>
          Leave
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nav;
