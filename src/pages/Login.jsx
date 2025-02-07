import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../styles/images/LogoWhite.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); 

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const formData = { username, password };

    try {
      const response = await fetch(
        "http://localhost/Devcabin/src/connection/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Server response:", response.status, data); 

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); //Store token in local storage
        localStorage.setItem("username", username); //Store username in local storage
        navigate("/home");
      } else {
        alert(`Error: ${data.error || "Login failed"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("There was an error with the login request.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="DevCabin" className="login-logo" />
      <p className="login-title">DEVELOPER'S CODE CABINET</p>

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-links">
            <a href="#">Forgot Password?</a>
            <a href="/Registration">REGISTER</a>
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
