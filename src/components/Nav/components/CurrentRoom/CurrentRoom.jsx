import("./CurrentRoom.css");

export default function CurrentRoom({ room, leaveRoom }) {
  if (room === "") return null;

  return (
    <div className="nav-room-wrapper">
      <div className="nav-room">
        <p>Current room:</p>
        <h2 className="roomTitle ">{room}</h2>
      </div>

      <button className="default-button leave-room-button" onClick={leaveRoom}>
        Leave room
      </button>
    </div>
  );
}
