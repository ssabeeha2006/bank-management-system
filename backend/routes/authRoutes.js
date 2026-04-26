const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================
// SIGNUP (FIXED + DEBUG)
// ======================
router.post("/signup", (req, res) => {
  const {
    name,
    fatherName,
    gender,
    dob,
    email,
    phone,
    address,
    pincode,
    occupation,
    income,
    education,   // from frontend
    accountType,
    cardNo,
    pin
  } = req.body;

  const sql = `
    INSERT INTO users 
    (name, fatherName, gender, dob, email, phone, address, pincode, occupation, income, qualification, accountType, cardNo, pin, balance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  db.query(
    sql,
    [
      name,
      fatherName,
      gender,
      dob,
      email,
      phone,
      address,
      pincode,
      occupation,
      income,
      education,   // 🔥 FIXED HERE
      accountType,
      cardNo,
      pin
    ],
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.json({
          status: "error",
          message: err.message
        });
      }

      res.json({ status: "success" });
    }
  );
});


// ======================
// LOGIN (SAFE FIX)
// ======================
router.post("/login", (req, res) => {
  const { cardNo, pin } = req.body;

  db.query(
    "SELECT * FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.json({ status: "error", message: "DB error" });
      }

      if (!result || result.length === 0) {
        return res.json({ status: "error", message: "User not found" });
      }

      if (result[0].pin !== pin) {
        return res.json({ status: "error", message: "Incorrect PIN" });
      }

      res.json({
        status: "success",
        user: result[0],
      });
    }
  );
});


// ======================
// DEPOSIT
// ======================
router.post("/deposit", (req, res) => {
  const { cardNo, amount } = req.body;

  db.query(
    "UPDATE users SET balance = balance + ? WHERE cardNo = ?",
    [amount, cardNo],
    (err) => {
      if (err) return res.json({ status: "error", message: err.message });

      const now = new Date();

      db.query(
        "INSERT INTO transactions (cardNo, type, amount, date, time) VALUES (?, ?, ?, ?, ?)",
        [
          cardNo,
          "Deposit",
          amount,
          now.toLocaleDateString(),
          now.toLocaleTimeString(),
        ]
      );

      res.json({ status: "success", message: "Deposit successful" });
    }
  );
});


// ======================
// WITHDRAW
// ======================
router.post("/withdraw", (req, res) => {
  const { cardNo, amount } = req.body;

  db.query(
    "SELECT balance FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {

      if (!result || result.length === 0) {
        return res.json({ status: "error", message: "User not found" });
      }

      if (result[0].balance < amount) {
        return res.json({ status: "error", message: "Insufficient balance" });
      }

      db.query(
        "UPDATE users SET balance = balance - ? WHERE cardNo = ?",
        [amount, cardNo],
        (err) => {
          if (err) return res.json({ status: "error", message: err.message });

          const now = new Date();

          db.query(
            "INSERT INTO transactions (cardNo, type, amount, date, time) VALUES (?, ?, ?, ?, ?)",
            [
              cardNo,
              "Withdraw",
              amount,
              now.toLocaleDateString(),
              now.toLocaleTimeString(),
            ]
          );

          res.json({ status: "success", message: "Withdraw successful" });
        }
      );
    }
  );
});


// ======================
// BALANCE
// ======================
router.post("/balance", (req, res) => {
  const { cardNo } = req.body;

  db.query(
    "SELECT balance FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {

      if (!result || result.length === 0) {
        return res.json({ status: "error", message: "User not found" });
      }

      const now = new Date();

      db.query(
        "INSERT INTO transactions (cardNo, type, amount, date, time) VALUES (?, ?, ?, ?, ?)",
        [
          cardNo,
          "Balance Check",
          result[0].balance,
          now.toLocaleDateString(),
          now.toLocaleTimeString(),
        ]
      );

      res.json({ status: "success", balance: result[0].balance });
    }
  );
});


// ======================
// CHANGE PIN
// ======================
router.post("/change-pin", (req, res) => {
  const { cardNo, oldPin, newPin } = req.body;

  db.query(
    "SELECT pin FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {

      if (!result || result.length === 0) {
        return res.json({ status: "error", message: "User not found" });
      }

      if (result[0].pin !== oldPin) {
        return res.json({ status: "error", message: "Wrong PIN" });
      }

      db.query(
        "UPDATE users SET pin = ? WHERE cardNo = ?",
        [newPin, cardNo],
        (err) => {

          if (err) return res.json({ status: "error", message: err.message });

          const now = new Date();

          db.query(
            "INSERT INTO transactions (cardNo, type, amount, date, time) VALUES (?, ?, ?, ?, ?)",
            [
              cardNo,
              "PIN Change",
              "-",
              now.toLocaleDateString(),
              now.toLocaleTimeString(),
            ]
          );

          res.json({ status: "success", message: "PIN updated successfully" });
        }
      );
    }
  );
});


// ======================
// MINI STATEMENT
// ======================
router.post("/statement", (req, res) => {
  const { cardNo } = req.body;

  db.query(
    "SELECT * FROM transactions WHERE cardNo = ? ORDER BY id DESC",
    [cardNo],
    (err, result) => {
      res.json({ status: "success", transactions: result });
    }
  );
});

module.exports = router;