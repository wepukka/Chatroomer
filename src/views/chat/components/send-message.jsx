import("./send-message.css");
import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <div className="sendMessageContainer">
      <input
        className="messageInput"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="default-button send-message-button"
        onClick={sendMessage}
      >
        <SendRoundedIcon sx={{ color: "white" }} />
      </button>
    </div>
  );
};

export default SendMessage;
