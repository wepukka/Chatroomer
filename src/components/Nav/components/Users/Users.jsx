import("./Users.css");

export default function Users({ roomUsers, username }) {
  return (
    <div className="users-container">
      {roomUsers.length > 0 && <h3 className="usersTitle">Users in room:</h3>}
      <ul className="usersList">
        {roomUsers.map((user) => (
          <li
            style={{
              borderColor: `${user.username === username ? "red" : "black"}`,
            }}
            key={user.id}
          >
            <p>{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
