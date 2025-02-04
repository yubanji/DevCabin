import React from "react";
import "../styles/Login.css";
import logo from "../styles/images/LogoWhite.png";

const Login = () => {
  return (
    <div className="login-container">
      <img src={logo} alt="DevCabin" className="login-logo" />
      <p className="login-title">DEVELOPER'S CODE CABINET</p>

      <div className="login-box">
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="USERNAME" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="PASSWORD" />
        </div>

        <div className="login-links">
          <a href="#">Forgot Password?</a>
          <a href="#">REGISTER</a>
        </div>

        <button type="submit" className="login-btn">LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
