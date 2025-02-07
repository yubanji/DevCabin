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
      const response = await fetch("http://localhost/Devcabin/src/connection/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });      
  
      const text = await response.text(); // Read raw response as text
      console.log("Raw response:", text); // Log server response

  
      try {
        const data = JSON.parse(text); // Try parsing JSON
        if (response.ok && !data.error) {
          alert("Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
          navigate("/home");
        } else {
          alert(`Error: ${data.error || "Login failed"}`);
        }
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        alert("Server returned an invalid response.");
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
