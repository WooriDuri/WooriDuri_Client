import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { existCookie } from "../../utils/existCookie";
import { FaWifi } from "react-icons/fa";
import { RiRotateLockFill } from "react-icons/ri";
import { ChatList, ChatOption, ChatWrap, Count, Footer, Options, RedDot } from "../chat/Chat";
import { FirstBar, SecondBar, ThirdBar, TopBar } from "../home/Home";
import fullBattery from "../../assets/images/배터리풀.png";
import { BsPersonPlusFill, BsChat, BsGear, BsMusicNoteBeamed, BsFillPersonFill, BsSearch, BsThreeDots } from "react-icons/bs";

function MyPage({ user }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    const cookie = existCookie();

    if (!cookie) {
      return navigate("/");
    }
  }, [navigate, pathname]);

  return (
    <ChatWrap>
      <TopBar>
        <FirstBar>
          No Service <FaWifi className="wifi" />
        </FirstBar>
        <SecondBar>21:23</SecondBar>
        <ThirdBar>
          <RiRotateLockFill className="lock" size="20" />
          <span>100%</span>
          <img src={fullBattery} alt="battery" width={35} height={35} style={{ marginLeft: "6px" }} />
        </ThirdBar>
      </TopBar>
      <ChatOption>
        <ChatList>Mypage</ChatList>
        <Options>
          <BsSearch className="search" size="27" />
          <BsPersonPlusFill className="person" size="30" style={{ marginLeft: "16px", marginTop: "-2px" }} />
          <BsMusicNoteBeamed className="music" size="27" />
          <BsGear className="gear" size="27" />
        </Options>
      </ChatOption>
      <div>{user.name}</div>
      <Footer>
        <div>
          <BsFillPersonFill size="30" className="person" />
        </div>
        <div onClick={() => navigate("/chat")}>
          <BsChat size="30" className="footerChat" />
          <Count>1</Count>
        </div>
        <div>
          <BsSearch size="28" className="footerSearch" />
        </div>
        <div>
          <BsThreeDots size="30" className="dots" />
          <RedDot />
        </div>
      </Footer>
    </ChatWrap>
  );
}

export default MyPage;
