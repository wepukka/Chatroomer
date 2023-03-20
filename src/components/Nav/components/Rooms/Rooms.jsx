import("./Rooms.css");

export default function Rooms({ rooms, setRoom }) {
  return (
    <div className="nav-rooms">
      <p className="nav-rooms-title">Your rooms</p>
      <div className="nav-select-room-wrapper">
        {rooms.map((room, index) => (
          <div
            key={index}
            id={room.room}
            className="nav-select-room-join"
            onClick={(e) => setRoom(e.target.id)}
          >
            {room.room}
          </div>
        ))}
      </div>
    </div>
  );
}
