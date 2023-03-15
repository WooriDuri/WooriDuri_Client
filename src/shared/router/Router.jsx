import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import Home from "../../components/home/Home";
import MyPage from "../../components/mypage/MyPage";
import SignUp from "../../components/sign/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/chat" Component={Chat} />
        <Route path="/mypage" Component={MyPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
