import React, { useState, useRef } from "react";
import "./login.css";
import { Place, Cancel } from "@mui/icons-material";
import axios from "axios";

function Login({ setShowLogin }) {
  const [fail, setFail] = useState(false);
  const nameRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      password: passRef.current.value,
    };

    try {
      await axios.post("/users/login", newUser);
      setFail(false);
    } catch (error) {
      setFail(true);
    }
  };

  return (
    <div className="login__container">
      <div className="logo__login">
        <Place />
        Travgenda
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passRef} />
        <button className="login__button">Login</button>

        {fail && <span className="failure">Please try again!</span>}
      </form>

      <Cancel className="login__cancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
