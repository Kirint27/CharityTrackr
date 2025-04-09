import React, { useState } from "react";
import styles from "./login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("Updated Email:", e.target.value);
  };
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Updated Password:", e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const url = `https://charitytrackr.onrender.com/api/login`;  // Directly concatenate the URL
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Include cookies for session management
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
  
        setLoading(false);
        console.log("Navigating to dashboard");

        navigate("/dashboard", { replace: true }); // Navigate to dashboard on successful login
      })
      .catch((err) => {
        setLoading(false);
        setError("Wrong email or password"); // Set error message for display
      });
  };
  
  return (
    <div className={styles.pageContainer}>
      <h1 className="title">GivingTracker</h1>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginLogo}>
            <img alt="" />
            <br />
            <p className={styles.slogan}>
              "Track Your Giving, Amplify Your Impact".
            </p>
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
                <div style={{ position: "relative" }}>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className={styles.passwordVisibilityIcon}
                  >
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
                <a className={styles.forgotten}><Link to="/forgot-password">Forgot Password</Link></a>
              </div>
              <button className={styles.primaryButton} type="submit">
                Login
              </button>
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </form>
            <button
              onClick={() => navigate("/register")}
              className="secondaryButton"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
      <p className={styles.learn}>
        New to GivingTracker: <Link to="/LearnMore">Learn more</Link>
      </p>
    </div>
  );
};

export default Login;
