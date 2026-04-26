// src/services/transactionService.js

export const logTransaction = (type, amount = "") => {
  const now = new Date();

  const transaction = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    day: now.toLocaleString("en-US", { weekday: "short" }),
    type: type,
    amount: amount,
  };

  let history = JSON.parse(localStorage.getItem("transactions")) || [];
  history.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(history));
};