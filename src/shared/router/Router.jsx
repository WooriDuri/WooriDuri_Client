import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import Home from "../../components/home/Home";
import MyPage from "../../components/mypage/MyPage";
import SignUp from "../../components/sign/SignUp";
import { decodeUser } from "../../utils/decodeUser";

function Router() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(decodeUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat user={user} />} />
        <Route path="/mypage" element={<MyPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
