const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================
// SIGNUP
// ======================
router.post("/signup", (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO users 
    (name, fatherName, gender, dob, email, phone, address, pincode, pan, aadhar, occupation, income, qualification, accountType, cardNo, pin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    data.name || "",
    data.fatherName || "",
    data.gender || "",
    data.dob || null,
    data.email || "",
    data.phone || "",
    data.address || "",
    data.pincode || "",
    data.pan || "",
    data.aadhar || "",
    data.occupation || "",
    Number(data.income) || 0,
    data.qualification || "",
    data.accountType || "",
    data.cardNo,
    data.pin
  ], (err) => {
    if (err) {
      console.log("❌ Signup Error:", err);
      return res.json({ message: "Error saving data" });
    }

    res.json({ message: "Signup successful" });
  });
});

// ======================
// LOGIN
// ======================
router.post("/login", (req, res) => {
  const { cardNo, pin } = req.body;

  db.query(
    "SELECT * FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {
      if (result.length === 0)
        return res.json({ message: "User not found" });

      if (result[0].pin !== pin)
        return res.json({ message: "Incorrect PIN" });

      res.json({ user: result[0] });
    }
  );
});

// ======================
// DEPOSIT (WITH LOG)
// ======================
router.post("/deposit", (req, res) => {
  const { cardNo, amount } = req.body;

  db.query(
    "UPDATE users SET balance = balance + ? WHERE cardNo = ?",
    [amount, cardNo],
    (err) => {
      if (err) return res.json({ message: "Error" });

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

      res.json({ message: "Deposit successful" });
    }
  );
});

// ======================
// WITHDRAW (WITH LOG)
// ======================
router.post("/withdraw", (req, res) => {
  const { cardNo, amount } = req.body;

  db.query(
    "SELECT balance FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {
      if (result[0].balance < amount)
        return res.json({ message: "Insufficient balance" });

      db.query(
        "UPDATE users SET balance = balance - ? WHERE cardNo = ?",
        [amount, cardNo],
        (err) => {
          if (err) return res.json({ message: "Error" });

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

          res.json({ message: "Withdraw successful" });
        }
      );
    }
  );
});

// ======================
// BALANCE (WITH LOG)
// ======================
router.post("/balance", (req, res) => {
  const { cardNo } = req.body;

  db.query(
    "SELECT balance FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {

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

      res.json({ balance: result[0].balance });
    }
  );
});

// ======================
// CHANGE PIN (WITH LOG)
// ======================
router.post("/change-pin", (req, res) => {
  const { cardNo, oldPin, newPin } = req.body;

  db.query(
    "SELECT pin FROM users WHERE cardNo = ?",
    [cardNo],
    (err, result) => {
      if (result[0].pin !== oldPin)
        return res.json({ message: "Wrong PIN" });

      db.query(
        "UPDATE users SET pin = ? WHERE cardNo = ?",
        [newPin, cardNo],
        () => {

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

          res.json({ message: "PIN updated successfully" });
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
      res.json({ transactions: result });
    }
  );
});

module.exports = router;