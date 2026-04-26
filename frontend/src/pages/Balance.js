import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Balance() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // 🔥 CALL BACKEND (important)
        const res = await API.post("/balance", {
          cardNo: user.cardNo,
        });

        setBalance(res.data.balance);

        // 🔥 ALSO UPDATE LOCAL STORAGE (so old UI works)
        localStorage.setItem("balance", res.data.balance);

      } catch (err) {
        console.log(err);
        alert("Error fetching balance");
      }
    };

    fetchBalance();
  }, []);

  const formatAmount = (amt) => {
    return new Intl.NumberFormat("en-IN").format(amt);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2>Balance Enquiry</h2>
          <button onClick={() => navigate("/home")} style={styles.back}>
            Back
          </button>
        </div>

        {/* Balance */}
        <div style={styles.balanceBox}>
          <p style={styles.label}>Available Balance</p>
          <h1 style={styles.amount}>₹ {formatAmount(balance)}</h1>
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
    width: "350px",
    padding: "25px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  back: {
    padding: "6px 12px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  balanceBox: {
    marginTop: "30px",
    textAlign: "center",
  },

  label: {
    fontSize: "14px",
    color: "#555",
  },

  amount: {
    color: "#28a745",
    fontSize: "28px",
    marginTop: "10px",
  },
};

export default Balance;