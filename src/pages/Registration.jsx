import React from "react";
import styles from "../styles/Registration.module.css";
import logo from "../styles/images/LogoWhite.png";

const Registration = () => {
  return (
    <div className={styles.loginContainer}>

   
      <img src={logo} alt="Logo" className={styles.loginLogo} />
        <p className={styles.loginTitle}>BE A CABINET USER</p>
        
        <div className={styles.loginBox}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Login User</label>
              <input type="text" placeholder="USERNAME" />
            </div>

            <div className={styles.formGroup}>
              <label>Login Password</label>
              <input type="password" placeholder="PASSWORD" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" placeholder="LAST NAME" />
            </div>

            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" placeholder="FIRST NAME" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
                <label>Employee ID</label>
                <input type="text" placeholder="EMPLOYEE ID" />
            </div>

            <div className={styles.formGroup}>
              <label>Company Email</label>
              <input type="email" placeholder="EMAIL" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Job Description</label>
              <input type="text" placeholder="JOB DESCRIPTION" />
            </div>
          </div>

          <div className={styles.loginLinks}>
            <a href="#">Forgot Password?</a>
            <a href="/">LOGIN</a>
          </div>

          <button type="submit" className={styles.loginBtn}>REGISTER</button>
        </div>
     
    </div>
  );
};

export default Registration;
