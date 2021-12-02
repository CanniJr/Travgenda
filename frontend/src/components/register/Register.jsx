import React from "react";
import "./register.css";
import PlaceIcon from "@mui/icons-material/Place";

function Register() {
  return (
    <div className="register__container">
      <div className="logo">
        <PlaceIcon />
        Travgenda
      </div>

      <form>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
