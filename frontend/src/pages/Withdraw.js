import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  const handleWithdraw = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      await API.post("/withdraw", {
        cardNo: user.cardNo,
        amount,
      });

      alert("Withdraw Successful!");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Withdraw Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.header}>
          <h2>🏦 SSR BANK</h2>
          <button onClick={() => navigate("/home")} style={styles.back}>
            Back
          </button>
        </div>

        <h3 style={styles.title}>Withdraw Money</h3>

        <label style={styles.label}>Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleWithdraw} style={styles.button}>
          Withdraw
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2f7",
  },
  card: {
    width: "420px",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginTop: "10px",
  },
  label: {
    marginTop: "20px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
  back: {
    padding: "6px 12px",
    background: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default Withdraw;