import("./authentication.css");

import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";

export default function Authentication(props) {
  const [isLoggingIn, setIsLogginIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="auth">
      <div className="auth-paper">
        <div className="auth-error-msg">{errorMsg}</div>
        {isLoggingIn ? (
          <Login {...props} setErrorMsg={setErrorMsg} />
        ) : (
          <Register {...props} setErrorMsg={setErrorMsg} />
        )}
      </div>
      <div
        className="auth-member"
        onClick={() => setIsLogginIn((prev) => !prev) & setErrorMsg("")}
      >
        {isLoggingIn ? "New user? Create account" : "Already member? Login"}
      </div>
    </div>
  );
}
