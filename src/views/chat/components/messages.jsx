import("./messages.css");
import { useState, useEffect, useRef } from "react";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";

const Messages = ({ socket, username }) => {
  const ref = useRef(null);
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Sort messages
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

  // Scroll to bottom when messages arrive, Currently not working with loading state //
  /* 
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messagesRecieved]); */

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  if (loading) {
    return (
      <div className="messages-loading">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="messagesColumn" ref={ref}>
      {messagesRecieved.map((msg, i) => (
        <div className="message-wrapper">
          {username !== msg.username ? (
            <div key={`spacer${i}`} className="message-other-user-spacer"></div>
          ) : null}
          <div
            className={`message ${
              username !== msg.username ? "message-other-user" : ""
            }`}
            key={i}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="msgMeta">{msg.username}</span>
              <span className="msgMeta msgMeta-created-time">
                {formatDateFromTimestamp(msg.__createdtime__)}
              </span>
            </div>
            <p className="msgText">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
