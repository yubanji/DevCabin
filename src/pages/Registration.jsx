import React from "react";
import styles from "../styles/Registration.module.css";
import logo from "../styles/images/LogoWhite.png";

const Registration = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch("http://localhost/Devcabin/src/connection/register.php", {
        method: "POST",
        body: formData
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
              <label>Login User</label>
              <input type="text" name="username" placeholder="USERNAME" required />
            </div>

            <div className={styles.formGroup}>
              <label>Login Password</label>
              <input type="password" name="password" placeholder="PASSWORD" required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" name="last_name" placeholder="LAST NAME" required />
            </div>

            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" name="first_name" placeholder="FIRST NAME" required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label>Employee ID</label>
                <input type="text" name="employee_id" placeholder="EMPLOYEE ID" required />
              </div>

            <div className={styles.formGroup}>
              <label>Company Email</label>
              <input type="email" name="email" placeholder="EMAIL" required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Job Description</label>
              <input type="text" name="job_description" placeholder="JOB DESCRIPTION" required />
            </div>
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
