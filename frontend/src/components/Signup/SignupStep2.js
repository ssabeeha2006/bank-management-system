// src/components/Signup/SignupStep2.js

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = location.state || {};

  const [form, setForm] = useState({
    income: "",
    education: "",
    occupation: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^[0-9]{12}$/;

    if (!form.income) newErrors.income = "Select income";
    if (!form.education) newErrors.education = "Select education";
    if (!form.occupation) newErrors.occupation = "Select occupation";

    if (!form.pan) newErrors.pan = "PAN required";
    else if (!panRegex.test(form.pan))
      newErrors.pan = "Invalid PAN (ABCDE1234F)";

    if (!form.aadhar) newErrors.aadhar = "Aadhar required";
    else if (!aadharRegex.test(form.aadhar))
      newErrors.aadhar = "Aadhar must be 12 digits";

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const allData = { ...prevData, ...form };
    navigate("/signup3", { state: allData });
  };

  const handleBack = () => {
    navigate("/signup1", { state: prevData });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup - Step 2</h2>

        {/* Income */}
        <label style={styles.label}>Income</label>
        <select name="income" value={form.income} onChange={handleChange} style={styles.input}>
          <option value="">Select Income</option>
          <option>Null</option>
          <option>&lt;1,50,000</option>
          <option>&lt;2,50,000</option>
          <option>&lt;5,00,000</option>
          <option>Upto 10,00,000</option>
          <option>Above 10,00,000</option>
        </select>
        <span style={styles.error}>{errors.income}</span>

        {/* Education */}
        <label style={styles.label}>Educational Qualification</label>
        <select name="education" value={form.education} onChange={handleChange} style={styles.input}>
          <option value="">Select Education</option>
          <option>Non-Graduate</option>
          <option>Graduate</option>
          <option>Post-Graduate</option>
          <option>Doctorate</option>
          <option>Others</option>
        </select>
        <span style={styles.error}>{errors.education}</span>

        {/* Occupation */}
        <label style={styles.label}>Occupation</label>
        <select name="occupation" value={form.occupation} onChange={handleChange} style={styles.input}>
          <option value="">Select Occupation</option>
          <option>Salaried</option>
          <option>Self-Employed</option>
          <option>Business</option>
          <option>Student</option>
          <option>Retired</option>
          <option>Others</option>
        </select>
        <span style={styles.error}>{errors.occupation}</span>

        {/* PAN */}
        <label style={styles.label}>PAN Number</label>
        <input
          name="pan"
          value={form.pan}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.pan}</span>

        {/* Aadhar */}
        <label style={styles.label}>Aadhar Number</label>
        <input
          name="aadhar"
          value={form.aadhar}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.aadhar}</span>

        <div style={styles.buttonGroup}>
          <button onClick={handleBack} style={styles.back}>Back</button>
          <button onClick={handleNext} style={styles.next}>Next</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "30px" },
  card: { width: "400px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "10px", background: "#fff" },
  label: { fontWeight: "bold", marginTop: "10px", display: "block" },
  input: { width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" },
  error: { color: "red", fontSize: "12px", display: "block" },
  buttonGroup: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
  back: { width: "45%", padding: "10px", background: "gray", color: "#fff", border: "none", borderRadius: "5px" },
  next: { width: "45%", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px" },
};

export default SignupStep2;