import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ChangePin() {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");   // ✅ added
  const navigate = useNavigate();

  const handleChangePin = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!oldPin || !newPin || !confirmPin) {
      alert("Enter all fields");
      return;
    }

    // ✅ check confirm PIN
    if (newPin !== confirmPin) {
      alert("New PIN and Confirm PIN do not match");
      return;
    }

    try {
      const res = await API.post("/change-pin", {
        cardNo: user.cardNo,
        oldPin,
        newPin,
      });

      // update local storage
      const updatedUser = { ...user, pin: newPin };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert(res.data.message);
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2>Change PIN</h2>
          <button onClick={() => navigate("/home")} style={styles.back}>
            Back
          </button>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <input
            type="password"
            placeholder="Old PIN"
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="New PIN"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            style={styles.input}
          />

          {/* ✅ NEW FIELD */}
          <input
            type="password"
            placeholder="Re-enter PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleChangePin} style={styles.button}>
            Update PIN
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
  },
  form: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default ChangePin;