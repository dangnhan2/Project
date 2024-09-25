import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  //   const [form, setForm] = useState({});

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">
          <b>Log in</b>
        </div>
        <div className="text">
          <b>Email or Username</b>
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email or Username"
        />
        <div className="inputPassword">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show === true ? "text" : "password"}
            placeholder="Password"
          />
          {password && (
            <i
              className={
                show
                  ? "fa-sharp fa-solid fa-eye"
                  : "fa-sharp fa-solid fa-eye-slash"
              }
              onClick={() => setShow(!show)}
            ></i>
          )}
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <div className="back">
          <i class="fa-solid fa-backward"></i> Go Back
        </div>
      </div>
    </>
  );
}

export default Login;
