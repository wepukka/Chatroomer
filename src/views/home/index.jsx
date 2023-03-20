import("./Home.css");
import { CreateModal, JoinModal } from "./modals/Modals";

const Home = ({ socket, isOpenModal, setIsOpenModal, setRoom }) => {
  return (
    <div className="home-container">
      <CreateModal
        socket={socket}
        setRoom={setRoom}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};

export default Home;
