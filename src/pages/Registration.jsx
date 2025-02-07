import React, { useState } from "react";
import styles from "../styles/Registration.module.css";
import logo from "../styles/images/LogoWhite.png";

const Registration = () => {
  const [employee_id, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobdesc, setJobdesc] = useState("");
  
  //Employee ID must be numric only
  const handleEmployeeIDChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setEmployeeID(value);
  };

  //First Name and Last Name must be letters only
  const handleFirstNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
    setLastName(value);
  };

  //Auto-generate username
  const generateUsername = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${lastName}_${randomNum}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Check if Passwords Match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData(event.target);
    formData.set("username", generateUsername()); // Auto-generate username

    try {
      const response = await fetch("http://localhost/Devcabin/src/connection/register.php", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log("Raw response:", text);

      const result = JSON.parse(text);
      alert(result.message || result.error);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logo} alt="Logo" className={styles.loginLogo} />
      <h3 className={styles.loginTitle}>BE A CABINET USER</h3>
      <p className={styles.loginTitle}>Insert following information</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.loginBox}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" name="first_name" placeholder="FIRST NAME" value={firstName} onChange={handleFirstNameChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" name="last_name" placeholder="LAST NAME" value={lastName} onChange={handleLastNameChange} required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input type="password" name="password" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input type="password" name="confirm_password" placeholder="CONFIRM PASSWORD" onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Employee ID</label>
              <input type="text" name="employee_id" placeholder="EMPLOYEE ID" value={employee_id} onChange={handleEmployeeIDChange} required />
            </div>

            <div className={styles.formGroup}>
              <label>Company Email</label>
              <input type="email" name="company_email" placeholder="EMAIL" pattern="^[a-zA-Z0-9._%+-]+@ekonek\.com$" required />
            </div>
          </div>
          <div className={styles.formGroup}>
              <label>Job Description</label>
              <input type="text" name="job_description" placeholder="JOB DESCRIPTION" value={jobdesc} onChange={(e) => setJobdesc(e.target.value)} required />
            </div>
          <div className={styles.loginLinks}>
            <a href="#">Forgot Password?</a>
            <a href="/">LOGIN</a>
          </div>
          <button type="submit" className={styles.loginBtn}>REGISTER</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
