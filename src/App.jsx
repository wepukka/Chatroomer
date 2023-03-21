import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

//
import Home from "./views/home/index";
import Chat from "./views/chat";
import Nav from "./components/Nav/Nav";

const socket = io.connect("http://localhost:4000"); // -- our server will run on port 4000, so we connect to it from here

function App() {
  // Username will be changed to currently logged in user //
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    console.log("modal open: ", isOpenModal);
  }, [isOpenModal]);

  return (
    <Router>
      <div className="App">
        <Nav
          socket={socket}
          room={room}
          username={username}
          setUsername={setUsername}
          setRoom={setRoom}
          setIsOpenModal={setIsOpenModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                socket={socket}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                setRoom={setRoom}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
