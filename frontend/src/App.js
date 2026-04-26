import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import SignupStep1 from "./components/Signup/SignupStep1";
import SignupStep2 from "./components/Signup/SignupStep2";
import SignupStep3 from "./components/Signup/SignupStep3";

// Pages
import Home from "./pages/Home";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Balance from "./pages/Balance";
import ChangePin from "./pages/ChangePin";
import MiniStatement from "./pages/MiniStatement";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup1" element={<SignupStep1 />} />
        <Route path="/signup2" element={<SignupStep2 />} />
        <Route path="/signup3" element={<SignupStep3 />} />

        <Route path="/home" element={<Home />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/change-pin" element={<ChangePin />} />
        <Route path="/mini-statement" element={<MiniStatement />} />

      </Routes>
    </Router>
  );
}

export default App;