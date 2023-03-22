import("./Rooms.css");

export default function Rooms({
  userRooms,
  setRoom,
  isDeleting,
  selectRoomsToDelete,
}) {
  return (
    <div className="nav-rooms">
      <p className="nav-rooms-title">Your rooms</p>
      <div className="nav-select-room-wrapper">
        {userRooms.map((room, index) => (
          <div
            key={index}
            id={room}
            className={`nav-select-room ${
              !isDeleting ? "nav-select-room-join" : "nav-select-room-delete"
            }`}
            onClick={
              (e) =>
                !isDeleting
                  ? setRoom(e.target.id)
                  : selectRoomsToDelete(
                      e.target.id
                    ) /* deleteUserRoom(e.target.id) */
            }
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
}
