import React from "react";
import ChatRoom from "./components/chat/ChatRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SignUp from "./components/sign/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chat" Component={ChatRoom} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </Router>
  );
}

export default App;
