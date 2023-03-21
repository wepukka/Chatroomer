import { useState } from "react";
import { apiLogin } from "../../../api/auth";

export default function Login(props) {
  const { setLoggedIn, setUser, setErrorMsg } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const login = async () => {
    let response = await apiLogin(username, password);
    console.log(response);
    !response.success
      ? setErrorMsg(response.msg)
      : handleLogin(response.payload.user);
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
      <button className="default-button" onClick={() => login()}>
        Login
      </button>
    </div>
  );
}
