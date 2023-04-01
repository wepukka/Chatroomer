import("./Home.css");
import { CreateModal, JoinModal } from "./components/modals/Modals";
import { useEffect } from "react";
import HomeInfo from "./components/HomeInfo/HomeInfo";

const Home = ({ socket, isOpenModal, setIsOpenModal, setRoom }) => {
  useEffect(() => {
    socket.on("all_users", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <HomeInfo />
        <CreateModal
          socket={socket}
          setRoom={setRoom}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </div>
  );
};

export default Home;
