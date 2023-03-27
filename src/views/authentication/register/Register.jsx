import { useState } from "react";
import { apiRegister } from "../../../api/auth";

export default function Register(props) {
  const { setLoggedIn, setUser, setErrorMsg } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const register = async () => {
    let response = await apiRegister(username, password);

    !response.success
      ? setErrorMsg(response.msg)
      : handleLogin(response.payload.user);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        value={username}
        placeholder="Username.."
        className="default-input"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password.."
        className="default-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="default-button" onClick={() => register()}>
        <p>Register</p>
      </button>
    </div>
  );
}
