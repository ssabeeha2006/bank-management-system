import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>🏦 SSR BANK</h2>
          <button onClick={() => navigate("/")} style={styles.logout}>
            Logout
          </button>
        </div>

        {/* Buttons */}
        <div style={styles.grid}>

          <button onClick={() => navigate("/deposit")} style={styles.btn}>
            Deposit
          </button>

          <button onClick={() => navigate("/withdraw")} style={styles.btn}>
            Withdraw
          </button>

          <button onClick={() => navigate("/balance")} style={styles.btn}>
            Balance
          </button>

          {/* 🔥 FIXED HERE */}
          <button onClick={() => navigate("/change-pin")} style={styles.btn}>
            Change PIN
          </button>

          {/* Centered button */}
          <button onClick={() => navigate("/mini-statement")} style={styles.btnCenter}>
            Mini Statement
          </button>

        </div>

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
    background: "#f0f2f5",
  },

  card: {
    width: "480px",
    padding: "35px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
  },

  logout: {
    padding: "8px 16px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  btn: {
    padding: "16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
  },

  btnCenter: {
    gridColumn: "1 / span 2",
    justifySelf: "center",
    width: "48%",
    padding: "16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default Home;