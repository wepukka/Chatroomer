import("./Home.css");
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  return <div className="home-container">HOME</div>;
};

export default Home;
