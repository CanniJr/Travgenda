import React, { useState, useRef } from "react";
import "./login.css";
import { Place, Cancel } from "@mui/icons-material";
import axios from "axios";

function Login({ setShowLogin, setCurrentUser }) {
  const [fail, setFail] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    console.log(user);

    try {
      const res = await axios.post("/users/login", user);
      setCurrentUser(res.data.username);
      setFail(false);
      setShowLogin(false);
    } catch (error) {
      setFail(true);
      setTimeout(() => setFail(false), 5000);
    }
  };

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
