import React, { useState, useRef } from "react";
import "./register.css";
import { Place, Cancel } from "@mui/icons-material";
// import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

function Register({ setShowRegistration }) {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setFail(false);
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  };

  return (
    <div className="register__container">
      <div className="logo__register">
        <Place />
        Travgenda
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passRef} />
        <button className="register__button">Register</button>
        {success && (
          <span className="success">
            Welcome to Travgenda! You can now login.
          </span>
        )}
        {fail && <span className="failure">Please try again!</span>}
      </form>

      <Cancel
        className="register__cancel"
        onClick={() => setShowRegistration(false)}
      />
    </div>
  );
}

export default Register;
