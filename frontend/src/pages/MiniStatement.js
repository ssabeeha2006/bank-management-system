import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MiniStatement() {
  const [transactions, setTransactions] = useState([]);
  const [txnCount, setTxnCount] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStatement();
  }, []);

  const fetchStatement = async () => {
    try {
      const res = await API.post("/statement", {
        cardNo: user.cardNo,
      });
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ONLY FIX ADDED (latest N transactions)
  const getSelectedTransactions = () => {
    const count = Number(txnCount);

    if (!count || count <= 0) return transactions;

    return transactions.slice(0, count); // backend already DESC
  };

  // ================= PRINT =================
const handlePrint = () => {
  const selectedTxns = getSelectedTransactions();

  const now = new Date();

  const html = `
    <h2 style="text-align:center;">SSR BANK</h2>
    <h3 style="text-align:center;">MINI STATEMENT</h3>

    <p><b>Name:</b> ${user.name}</p>
    <p><b>Card No:</b> ${user.cardNo}</p>
    <p><b>Date:</b> ${now.toLocaleDateString()}</p>
    <p><b>Time:</b> ${now.toLocaleTimeString()}</p>
    <p><b>Day:</b> ${now.toLocaleString("en-IN", { weekday: "long" })}</p>

    <br/>

    <table border="1" style="width:100%; border-collapse:collapse;">
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Type</th>
        <th>Amount</th>
      </tr>
      ${selectedTxns
        .map(
          (t) => `
        <tr>
          <td>${t.date}</td>
          <td>${t.time}</td>
          <td>${t.type}</td>
          <td>${t.amount === "-" ? "-" : "₹ " + t.amount}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  const win = window.open("", "", "width=800,height=600");
  win.document.write(html);
  win.document.close();
  win.print();
};

  // ================= DOWNLOAD =================
const handleDownload = () => {
  const selectedTxns = getSelectedTransactions();

  const doc = new jsPDF();
  const now = new Date();

  // Title
  doc.setFontSize(16);
  doc.text("SSR BANK", 80, 10);

  doc.setFontSize(12);
  doc.text("MINI STATEMENT", 70, 18);

  // User details
  doc.setFontSize(10);
  doc.text(`Name: ${user.name}`, 14, 28);
  doc.text(`Card No: ${user.cardNo}`, 14, 34);
  doc.text(`Date: ${now.toLocaleDateString()}`, 14, 40);
  doc.text(`Time: ${now.toLocaleTimeString()}`, 14, 46);
  doc.text(
    `Day: ${now.toLocaleString("en-IN", { weekday: "long" })}`,
    14,
    52
  );

  // Table
  autoTable(doc, {
    startY: 60,
    head: [["Date", "Time", "Type", "Amount"]],
    body: selectedTxns.map((t) => [
      t.date,
      t.time,
      t.type,
      t.amount === "-" ? "-" : "₹ " + t.amount,
    ]),
  });

  doc.save("MiniStatement.pdf");
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

        <h3 style={styles.title}>Mini Statement</h3>

        {/* Table Header */}
        <div style={styles.tableHeader}>
          <span>Date</span>
          <span>Time</span>
          <span>Type</span>
          <span>Amount</span>
        </div>

        {/* Rows */}
        {transactions.map((t, i) => (
          <div key={i} style={styles.row}>
            <span>{t.date}</span>
            <span>{t.time}</span>
            <span>{t.type}</span>
            <span
              style={{
                color:
                  t.type === "Deposit"
                    ? "green"
                    : t.type === "Withdraw"
                    ? "red"
                    : "blue",
              }}
            >
              ₹ {t.amount}
            </span>
          </div>
        ))}

        {/* Controls */}
        <div style={styles.controls}>
          <input
            type="number"
            placeholder="No.of Transactions"
            value={txnCount}
            onChange={(e) => setTxnCount(e.target.value)}
            style={styles.input}
          />

          <button style={styles.print} onClick={handlePrint}>
            Print
          </button>

          <button style={styles.download} onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    width: "600px",
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
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  title: {
    textAlign: "center",
    margin: "15px 0",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    background: "#1976d2",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    padding: "10px",
    marginTop: "8px",
    background: "#f9f9f9",
    borderRadius: "6px",
  },
  controls: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },
  input: {
    height: "42px",
    width: "130px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  print: {
    flex: 1,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
  download: {
    flex: 1,
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
};

export default MiniStatement;