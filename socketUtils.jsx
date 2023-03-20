export function socketLeaveRoom(socket, username, room) {
  const __createdtime__ = Date.now();
  socket.emit("leave_room", { username, room, __createdtime__ });
}

export function socketJoinRoom(socket, username, room) {
  socket.emit("join_room", { username, room });
}
