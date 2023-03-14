import axios from "axios";
import { getCookieToken } from "../../shared/cookie/Cookie";

const baseURL = "https://mo-inda.shop";

const myToken = getCookieToken();

//const refreshToken = localStorage.getItem("token");
export const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${myToken}`,
    "Cache-Control": "no-cache",
    withCredentials: true,
  },
});

export const postApi = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${myToken}`,
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
    withCredentials: true,
  },
});

export default instance;
