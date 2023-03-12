import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/chat");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  return (
    <div>
      Home
      <button onClick={onLogin}>채팅방으로</button>
      <button onClick={onSignUp}>회원가입</button>
    </div>
  );
}

export default Home;
