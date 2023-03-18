import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Home from "./views/home/index";
import Chat from "./views/chat";
import Nav from "./views/home/components/Nav/Nav";

const socket = io.connect("http://localhost:4000"); // -- our server will run on port 4000, so we connect to it from here

function App() {
  // Username will be changed to currently logged in user //
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Nav
          socket={socket}
          room={room}
          username={username}
          setRoom={setRoom}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
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
