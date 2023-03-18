// client/src/pages/chat/messages.js

import("./messages.css");
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket, username }) => {
  const ref = useRef(null);
  const [messagesRecieved, setMessagesReceived] = useState([]);

  useEffect(() => {
    // Last 1000 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_1000_messages", (last1000Messages) => {
      console.log("Last 1000 messages:", JSON.parse(last1000Messages));
      last1000Messages = JSON.parse(last1000Messages);
      // Sort these messages by __createdtime__
      last1000Messages = sortMessagesByDate(last1000Messages);
      setMessagesReceived((state) => [...last1000Messages, ...state]);
    });

    return () => socket.off("last_1000_messages");
  }, [socket]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messagesRecieved]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="messagesColumn" ref={ref}>
      {messagesRecieved.map((msg, i) => (
        <div
          className="message"
          style={{
            marginLeft: username !== msg.username ? "auto" : "none",
          }}
          key={i}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="msgMeta">{msg.username}</span>
            <span className="msgMeta">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className="msgText">{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
