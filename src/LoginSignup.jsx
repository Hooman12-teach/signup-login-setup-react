import React, { useState } from "react";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  // Signup states
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [message, setMessage] = useState("");

  // Email validation
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Password validation (strong password)
  const isStrongPassword = (password) => {
    return password.length >= 6;
  };

  // Signup Handler
  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName || !signupEmail || !signupPassword || !confirmPassword) {
      setMessage("❌ All fields are required!");
      return;
    }

    if (!isValidEmail(signupEmail)) {
      setMessage("❌ Invalid email format!");
      return;
    }

    if (!isStrongPassword(signupPassword)) {
      setMessage("❌ Password must be at least 6 characters!");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    // Save to localStorage
    const userData = {
      fullName,
      email: signupEmail,
      password: signupPassword,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setMessage("✅ Signup successful! You can now login.");
    setIsLogin(true);

    // Clear fields
    setFullName("");
    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!loginEmail || !loginPassword) {
      setMessage("❌ All fields are required!");
      return;
    }

    if (!savedUser) {
      setMessage("❌ No user found, please signup first!");
      return;
    }

    if (
      loginEmail === savedUser.email &&
      loginPassword === savedUser.password
    ) {
      setMessage("✅ Login successful! Welcome " + savedUser.fullName);
    } else {
      setMessage("❌ Invalid email or password!");
    }

    // Clear fields
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isLogin ? "Login" : "Signup"}</h1>

      {/* Toggle Buttons */}
      <div style={styles.toggleBox}>
        <button style={styles.toggleBtn} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button style={styles.toggleBtn} onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </div>

      {/* Message */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Signup Form */}
      {!isLogin && (
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            Signup
          </button>
        </form>
      )}

      {/* Login Form */}
      {isLogin && (
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

// Simple inline CSS
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #b12121ff",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "10px",
  },
  toggleBox: {
    marginBottom: "15px",
  },
  toggleBtn: {
    margin: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "5px 0",
    padding: "10px",
    fontSize: "16px",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    color: "red",
    marginBottom: "10px",
  },
};

export default LoginSignup;
