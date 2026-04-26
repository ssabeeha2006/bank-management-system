import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Deposit() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  // ✅ Check login
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/"); // redirect to login
    }
  }, [navigate]);

  const handleDeposit = async () => {
    const depositAmount = Number(amount);

    if (!amount || depositAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await API.post("/deposit", {
        cardNo: user.cardNo,
        amount: depositAmount,
      });

      alert("Deposit Successful!");
      setAmount("");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Deposit Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2>🏦 SSR BANK</h2>
          <button onClick={() => navigate("/home")} style={styles.back}>
            Back
          </button>
        </div>

        <h3 style={styles.title}>Deposit Money</h3>

        {/* Input */}
        <label style={styles.label}>Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
          placeholder="Enter amount"
        />

        {/* Button */}
        <button onClick={handleDeposit} style={styles.button}>
          Deposit
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
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  back: {
    padding: "6px 12px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Deposit;