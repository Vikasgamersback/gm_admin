/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import constants from "../../json/constants.json";

const Logout = () => {
  const navigate = useNavigate();
  const [cookies,setCookies , removeCookie] = useCookies();

  useEffect(() => {
      if (cookies[constants.ADMINDATA]) {
      removeCookie(constants.ADMINDATA, { path: "/" });
    }
    if (cookies[constants.SERVICESCOOKIE]) {
      removeCookie(constants.SERVICESCOOKIE, { path: "/" });
    }
    // if (cookies[constants.MODECOOKIE]) {
    //   removeCookie(constants.MODECOOKIE, { path: "/" });
    // }
    navigate("/login");
  }, [cookies, navigate, removeCookie]);
};

export default Logout;