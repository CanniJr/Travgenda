import React, { useState, useRef } from "react";
import "./login.css";
import { Place, Cancel } from "@mui/icons-material";
import { axiosInstance } from "./config";

function Login({ setShowLogin, setCurrentUser, myStorage }) {
  const [fail, setFail] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    try {
      const res = await axiosInstance.post("/users/login", user);
      myStorage.setItem("username", res.data.username);
      setCurrentUser(myStorage.getItem("username"));

      setFail(false);
      setShowLogin(false);
    } catch (error) {
      setFail(true);
      setTimeout(() => setFail(false), 5000);
    }
  };
  //   console.log(myStorage.getItem("username"));

  return (
    <div className="login__container">
      <div className="logo__login">
        <Place />
        Travgenda
      </div>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passRef} />
        <button className="login__button">Login</button>

        {fail && <span className="failure">Please try again!</span>}
      </form>

      <Cancel className="login__cancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
