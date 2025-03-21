
import React, { useState } from "react";
import styles from "./Login.module.scss";
import Footer from "../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("Updated Email:", e.target.value);
  };
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Updated Password:", e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Sending login request with:");
    console.log(email);
    console.log(password);
    const url = new URL("http://localhost:3001/api/login"); // Adjust based on your backend

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        console.log("Navigation triggered");

        setLoading(false);
        navigate("/dashboard", { replace: true }); // Add { replace: true } to navigate correctly
      })
      .catch((err) => {
        setLoading(false);
        setError(" Wrong email or password"); // Set error message for display
      });
  };
  return (
    <div className={styles.pageContainer}>
      <h1 className="title">GivingTacker</h1>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginLogo}>
            <img src={require('./logo.png')} alt="" />
            <br />
            <p className={styles.slogan}>"Track Your Giving, Amplify Your Impact".</p>
          </div>
  
          <div className={styles.loginForm}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />{" "}
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <a className={styles.forgotten}>Forgot Password</a>
              </div>
              <button className={styles.primaryButton} type="submit">
                Login
              </button>
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </form>
            <button onClick={() => navigate("/register")} className="secondaryButton">
              Create Account
            </button>
          </div>
        </div>
      </div>
      <p className={styles.learn}>
  New to GivingTracker: <Link to="/LearnMore">Learn more</Link>
</p>
      <Footer />
    </div>
  );
};

export default Login;
