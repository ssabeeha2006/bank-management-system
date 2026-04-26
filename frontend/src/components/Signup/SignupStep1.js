// src/components/Signup/SignupStep1.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupStep1() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    const phoneRegex = /^[6-9][0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^[0-9]{6}$/;

    // Age validation
    const today = new Date();
    const dob = new Date(form.dob);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (!form.name) newErrors.name = "Name is required";
    if (!form.fatherName) newErrors.fatherName = "Father name is required";
    if (!form.gender) newErrors.gender = "Select gender";

    if (!form.dob) newErrors.dob = "Date of birth required";
    else if (age < 18) newErrors.dob = "Must be 18+";

    if (!form.email) newErrors.email = "Email required";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";

    if (!form.phone) newErrors.phone = "Phone required";
    else if (!phoneRegex.test(form.phone))
      newErrors.phone = "Invalid phone (10 digits, starts 6-9)";

    if (!form.address) newErrors.address = "Address required";

    if (!form.pincode) newErrors.pincode = "Pincode required";
    else if (!pincodeRegex.test(form.pincode))
      newErrors.pincode = "Invalid pincode (6 digits)";

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/signup2", { state: form });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup - Step 1</h2>

        {/* Name */}
        <label style={styles.label}>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.name}</span>

        {/* Father Name */}
        <label style={styles.label}>Father Name</label>
        <input
          name="fatherName"
          value={form.fatherName}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.fatherName}</span>

        {/* Gender */}
        <label style={styles.label}>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <span style={styles.error}>{errors.gender}</span>

        {/* DOB */}
        <label style={styles.label}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.dob}</span>

        {/* Email */}
        <label style={styles.label}>Email Address</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.email}</span>

        {/* Phone */}
        <label style={styles.label}>Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.phone}</span>

        {/* Address */}
        <label style={styles.label}>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.address}</span>

        {/* Pincode */}
        <label style={styles.label}>Pincode</label>
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.pincode}</span>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button onClick={handleBack} style={styles.back}>
            Back
          </button>
          <button onClick={handleNext} style={styles.next}>
            Next
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
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "5px",
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
    borderRadius: "5px",
  },
  next: {
    width: "45%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default SignupStep1;