import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { removeCookieToken } from "../shared/cookie/Cookie";

const cookies = new Cookies();
const myToken = cookies.get("Authorization");

const UseUser = () => {
  const [user, setUser] = useState();
  const isMyTokenIsExpired = useMemo(() => isExpired(myToken), []);

  if (isMyTokenIsExpired) {
    removeCookieToken();
  }

  const readUser = async () => {
    const userInfo = decodeToken(myToken);
    setUser(userInfo);
  };

  useEffect(() => {
    if (myToken) {
      readUser();
    }
  }, []);

  return user;
};
export default UseUser;
