import("./Rooms.css");
import React from "react";

export default function Rooms({
  userRooms,
  setRoom,
  isDeleting,
  selectedRooms,
  setSelectedRooms,
}) {
  // Select rooms to delete //
  const selectRoomsToDelete = (roomId) => {
    const elem = document.getElementById(roomId);
    if (selectedRooms.includes(roomId)) {
      elem.classList.remove("room-delete-selected");
      setSelectedRooms((current) => current.filter((room) => room !== roomId));
    } else {
      elem.classList.add("room-delete-selected");
      setSelectedRooms((oldArray) => [...oldArray, roomId]);
    }
  };

  return (
    <div className="nav-rooms">
      <p className="nav-rooms-title">Your rooms</p>
      <div className="nav-select-room-wrapper">
        {userRooms.map((room) => (
          <div
            key={room}
            id={room}
            className={`nav-select-room ${
              !isDeleting ? "nav-select-room-join" : "nav-select-room-delete"
            }`}
            onClick={(e) =>
              !isDeleting
                ? setRoom(e.target.id)
                : selectRoomsToDelete(e.target.id)
            }
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
}
