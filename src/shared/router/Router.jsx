import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "../../components/chat/ChatRoom";
import Home from "../../components/home/Home";
import SignUp from "../../components/sign/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chat" Component={ChatRoom} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
