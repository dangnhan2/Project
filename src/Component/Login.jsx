import { useEffect, useState } from "react";
import { loginApi } from "../Service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Missing email or password");
      return;
    }
    setShowLoading(true);
    let res = await loginApi("eve.holt@reqres.in", "cityslicka");
    //console.log(res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) toast.error(res.data.error);
    }
    setShowLoading(false);
  };
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
          disabled={(email && password) || showLoading ? false : true}
          onClick={handleLogin}
        >
          {showLoading ? <i className="fas fa-spinner fa-pulse"></i> : ""} Login
        </button>
        <div className="back">
          <i className="fa-solid fa-backward"></i> Go Back
        </div>
      </div>
    </>
  );
}

export default Login;
