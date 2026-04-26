import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [cardNo, setCardNo] = useState("");
  const [pin, setPin] = useState("");

const handleLogin = async () => {
  try {
    const res = await API.post("/login", {
      cardNo,
      pin,
    });

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    alert("Login error");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.bank}>🏦 SSR BANK</h2>
        <h3 style={styles.title}>Login</h3>

        <label style={styles.label}>Card Number</label>
        <input
          type="text"
          value={cardNo}
          onChange={(e) => setCardNo(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>PIN</label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={styles.input}
        />

        <div style={styles.buttonGroup}>
          <button onClick={handleLogin} style={styles.loginBtn}>
            Login
          </button>

          <button
            onClick={() => {
              setCardNo("");
              setPin("");
            }}
            style={styles.clearBtn}
          >
            Clear
          </button>
        </div>

        {/* ✅ IMPORTANT FIX */}
        <p style={styles.signup}>
          New user?{" "}
          <span onClick={() => navigate("/signup1")} style={styles.link}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
  },
  card: {
    width: "380px",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  bank: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  loginBtn: {
    width: "48%",
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  clearBtn: {
    width: "48%",
    padding: "10px",
    background: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  signup: {
    textAlign: "center",
    marginTop: "15px",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;