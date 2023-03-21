import("./chat.css");
import Messages from "./components/messages";
import SendMessage from "./components/send-message";

const Chat = ({ socket, username, room }) => {
  return (
    <div className="chatContainer">
      <Messages socket={socket} username={username} />
      <SendMessage socket={socket} username={username} room={room} />
    </div>
  );
};

export default Chat;
