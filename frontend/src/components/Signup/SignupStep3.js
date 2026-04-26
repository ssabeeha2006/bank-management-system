import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";

function SignupStep3() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = location.state || {};

  const [form, setForm] = useState({
    accountType: "",
    cardNo: "",
    pin: "",
    confirmPin: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    const cardRegex = /^[0-9]{16}$/;
    const pinRegex = /^[0-9]{4}$/;

    if (!form.accountType) newErrors.accountType = "Select account type";

    if (!form.cardNo) newErrors.cardNo = "Card number required";
    else if (!cardRegex.test(form.cardNo))
      newErrors.cardNo = "Card must be 16 digits";

    if (!form.pin) newErrors.pin = "PIN required";
    else if (!pinRegex.test(form.pin))
      newErrors.pin = "PIN must be 4 digits";

    if (!form.confirmPin) newErrors.confirmPin = "Confirm PIN";
    else if (form.pin !== form.confirmPin)
      newErrors.confirmPin = "PIN does not match";

    if (!form.agree) newErrors.agree = "Accept terms";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const finalData = { ...prevData, ...form };

    try {
      await API.post("/signup", finalData);

      alert("Signup Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const handleBack = () => {
    navigate("/signup2", { state: prevData });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup - Step 3</h2>

        <label style={styles.label}>Account Type</label>
        <select
          name="accountType"
          value={form.accountType}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Account Type</option>
          <option>Savings</option>
          <option>Current</option>
        </select>
        <span style={styles.error}>{errors.accountType}</span>

        <label style={styles.label}>Card Number</label>
        <input
          name="cardNo"
          value={form.cardNo}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.cardNo}</span>

        <label style={styles.label}>PIN</label>
        <input
          type="password"
          name="pin"
          value={form.pin}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.pin}</span>

        <label style={styles.label}>Confirm PIN</label>
        <input
          type="password"
          name="confirmPin"
          value={form.confirmPin}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.confirmPin}</span>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />{" "}
          I agree to terms and conditions
        </label>
        <span style={styles.error}>{errors.agree}</span>

        <div style={styles.buttonGroup}>
          <button onClick={handleBack} style={styles.back}>
            Back
          </button>
          <button onClick={handleSubmit} style={styles.submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  card: {
    width: "400px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    background: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  checkbox: {
    marginTop: "10px",
    display: "block",
  },
  error: {
    color: "red",
    fontSize: "12px",
    display: "block",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  back: {
    width: "45%",
    padding: "10px",
    background: "gray",
    color: "#fff",
    border: "none",
  },
  submit: {
    width: "45%",
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none",
  },
};

export default SignupStep3;