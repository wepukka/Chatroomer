import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

//
import Authentication from "./views/authentication";
import Home from "./views/home/index.jsx";
import Chat from "./views/chat";
import Nav from "./components/Nav/Nav";
import { authenticate } from "./api/auth";

const socket = io.connect("http://localhost:4000"); // -- our server will run on port 4000, so we connect to it from here

function App() {
  // Username will be changed to currently logged in user //
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    console.log("modal open: ", isOpenModal);
  }, [isOpenModal]);

  const checkAuthentication = async () => {
    let response = await authenticate();

    if (response.success) {
      setUser(response.payload.user.username);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setUser("");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn)
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <Authentication setLoggedIn={setLoggedIn} setUser={setUser} />
              }
            />
            <Route
              path="*"
              element={
                <Authentication setLoggedIn={setLoggedIn} setUser={setUser} />
              }
            />
          </Routes>
        </div>
      </Router>
    );

  return (
    <Router>
      <div className="App">
        <Nav
          socket={socket}
          room={room}
          username={user}
          setRoom={setRoom}
          setIsOpenModal={setIsOpenModal}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route path="/auth" element={<Authentication />} />
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
            element={<Chat username={user} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
