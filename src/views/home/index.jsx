import("./Home.css");
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    // Redirect to /chat
    navigate("/chat", { replace: true });
  };

  return (
    <div className="home-container">
      <input
        className="home-input"
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <select className="home-input" onChange={(e) => setRoom(e.target.value)}>
        <option>-- Select Room --</option>
        <option value="javascript">JavaScript</option>
        <option value="node">Node</option>
        <option value="express">Express</option>
        <option value="react">React</option>
      </select>

      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Home;
