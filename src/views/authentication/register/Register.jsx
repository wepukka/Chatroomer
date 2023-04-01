import { useState } from "react";
import { apiRegister } from "../../../api/auth";

export default function Register(props) {
  const { setLoggedIn, setUser, setErrorMsg } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const testCredentilasLength = () => {
    if (username.length < 4) {
      setErrorMsg("Minimium username length is 4!");
      return false;
    }

    if (password.length < 8) {
      setErrorMsg("Minimium password length is 8");
      return false;
    }
    return true;
  };

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const register = async () => {
    if (!testCredentilasLength(username, password)) {
      return;
    }

    let response = await apiRegister(username, password);

    response.success
      ? handleLogin(response.payload.user)
      : setErrorMsg(response.msg);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        id="register-username"
        value={username}
        placeholder="Username.."
        className="default-input"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="register-password"
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
